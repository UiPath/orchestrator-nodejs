'use strict';

// native
var querystring = require('querystring');

// local
var restHelper = require('./restHelper');
var v2 = require('./v2');

var WELL_KNOWN_METHODS = restHelper.WELL_KNOWN_METHODS;

// TODO we may want to handle relative path for servers configured to host Orchestrator other than at root

/**
 * @param {OrchestratorOptions} options
 * @returns {OrchestratorOptions}
 */
function validateOptions(options) {
    if (!options) {
        throw new Error('OrchestratorOptions cannot be undefined');
    }
    // Default to secure connection
    if (options.isSecure !== true || options.isSecure !== false) {
        options.isSecure = true;
    }
    return options;
}

/**
 * @param {OrchestratorOptions} options
 * @constructor
 */
function Orchestrator(options) {
    /**
     * @type {OrchestratorOptions}
     * @private
     */
    this._options = validateOptions(options);
    /**
     * @type {Array.<OrchestratorQueueElement>}
     * @private
     */
    this._queue = [];
    /**
     * @type {boolean}
     * @private
     */
    this._processing = false;
    /**
     * @type {string|undefined}
     * @private
     */
    this._credentials = undefined;
    /** @type {RestGroup} */
    this.v2 = v2.v2Factory(this);
}

module.exports = Orchestrator;

/**
 * @private
 * @param {function(Error=)} callback
 */
Orchestrator.prototype._login = function (callback) {
    var self = this;
    /** @type {OrchestratorOptions} */
    var options = this._options;
    /** @type {OrchestratorRestHelperOptions} */
    var requestOptions = {
        hostname: options.hostname,
        isSecure: options.isSecure,
        port: options.port,
        path: '/api/Account'
    };
    /** @type {Object} */
    var loginRequestData = {
        'TenancyName': options.tenancyName,
        'UsernameOrEmailAddress': options.usernameOrEmailAddress,
        'Password': options.password
    };
    restHelper.postJSON(
        requestOptions,
        loginRequestData,
        /**
         * @param {Error} err
         * @param {OrchestratorLoginResponse} response
         */
        function (err, response) {
            if (!err) {
                self._credentials = response.result;
            }
            callback(err);
        }
    );
};

/**
 * @param {OrchestratorRestHelperCallback} callback
 * @param {Error} err
 * @param {Object} [data]
 * @private
 */
Orchestrator.prototype._triggerQueueElementCallback = function (callback, err, data) {
    // Use a try-finally to make sure the application code does not interrupt the queue
    try {
        callback(err, data);
    } finally {
        this._processing = false;
        this._processQueue();
    }
};

/**
 * @param {OrchestratorQueueElement} element
 * @param {boolean} isRetry
 * @returns {OrchestratorRestHelperCallback}
 */
Orchestrator.prototype._processingResultHandlerFactory = function (element, isRetry) {
    var self = this;
    return function (err, data) {
        if (err  && !isRetry) {
            self._login(function (err) { // attempt to login before retrying
                if (err) {
                    self._credentials = undefined; // login failed so reset credentials
                    self._triggerQueueElementCallback(element.cb, err);
                    return;
                }
                // retry with new credentials
                self._processElement(element, true);
            });
            return;
        }
        // succeed or fail, but no retry
        self._triggerQueueElementCallback(element.cb, err, data);
    };
};

/**
 * @param {OrchestratorQueueElement} element
 * @param {boolean} isRetry
 * @private
 */
Orchestrator.prototype._processElement = function (element, isRetry) {
    /** @type {OrchestratorRestHelperOptions} */
    var options = element.options;

    options.headers = options.headers || {};
    options.headers.authorization = 'bearer ' + this._credentials; // TODO check if systematically needed
    switch (element.method) {
        case WELL_KNOWN_METHODS.GET:
            restHelper.getJSON(
                element.options,
                this._processingResultHandlerFactory(element, isRetry)
            );
            break;
        case WELL_KNOWN_METHODS.POST:
            restHelper.postJSON(
                element.options,
                element.data,
                this._processingResultHandlerFactory(element, isRetry)
            );
            break;
        case WELL_KNOWN_METHODS.PUT:
            restHelper.putJSON(
                element.options,
                element.data,
                this._processingResultHandlerFactory(element, isRetry)
            );
            break;
        default:
            element.cb(new Error('Method not supported: ' + element.method));
    }
};

/** @private */
Orchestrator.prototype._processQueue = function () {
    var self = this;
    /** @type {OrchestratorQueueElement|undefined} */
    var element;

    if (this._processing) { // already processing an element
        return;
    }
    element = this._queue.shift();
    if (element === undefined) { // nothing left to process
        return;
    }
    this._processing = true;
    if (this._credentials) { // already logged-in, move on to processing the element
        this._processElement(element, false); // credentials may be expired
        return;
    }
    this._login(function (err) { // attempt to login before processing
        if (err) {
            self._triggerQueueElementCallback(element.cb, err);
            return;
        }
        self._processElement(element, true); // credentials are expected to work
    });
};

/**
 * @param {string} path
 * @param {Object.<string|Array.<string>>} query
 * @param {function(err: Error|undefined, response: Object=)} callback
 */
Orchestrator.prototype.get = function (path, query, callback) {
    /** @type {OrchestratorOptions} */
    var options = this._options;
    /** @type {string} */
    var pathWithQuery = path + '?' + querystring.encode(query);

    this._queue.push({
        method: WELL_KNOWN_METHODS.GET,
        options: {
            hostname: options.hostname,
            isSecure: options.isSecure,
            port: options.port,
            path: pathWithQuery
        },
        cb: callback
    });
    this._processQueue();
};

/**
 * @param {string} path
 * @param {Object} data
 * @param {function(err: Error|undefined, response: Object=)} callback
 */
Orchestrator.prototype.post = function (path, data, callback) {
    /** @type {OrchestratorOptions} */
    var options = this._options;

    this._queue.push({
        method: WELL_KNOWN_METHODS.POST,
        options: {
            hostname: options.hostname,
            isSecure: options.isSecure,
            port: options.port,
            path: path
        },
        data: data,
        cb: callback
    });
    this._processQueue();
};

/**
 * @param {string} path
 * @param {Object} data
 * @param {function(err: Error|undefined, response: Object=)} callback
 */
Orchestrator.prototype.put = function (path, data, callback) {
    /** @type {OrchestratorOptions} */
    var options = this._options;

    this._queue.push({
        method: WELL_KNOWN_METHODS.PUT,
        options: {
            hostname: options.hostname,
            isSecure: options.isSecure,
            port: options.port,
            path: path
        },
        data: data,
        cb: callback
    });
    this._processQueue();
};

/**
 * @typedef {Object} OrchestratorOptions
 * @property {string} tenancyName
 * @property {string} usernameOrEmailAddress
 * @property {string} password
 * @property {string} hostname
 * @property {boolean} isSecure
 * @property {number|undefined} port
 */

/**
 * @typedef {Object} OrchestratorResponseBase
 * @property {string|null} targetUrl
 * @property {boolean} success
 * @property {string|null} error
 * @property {boolean} unAuthorizedRequest
 */

/**
 * @typedef {OrchestratorResponseBase} OrchestratorLoginResponse
 * @property {string} result - The token value
 */

/**
 * @typedef {Object} OrchestratorQueueElement
 * @property {WELL_KNOWN_METHODS} method
 * @property {OrchestratorRestHelperOptions} options
 * @property {Object|undefined} data
 * @property {OrchestratorRestHelperCallback} cb
 */
