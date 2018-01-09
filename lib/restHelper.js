'use strict';

// native
var http = require('http');
var https = require('https');

/** @enum {string} */
var WELL_KNOWN_METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST'
};
module.exports.WELL_KNOWN_METHODS = WELL_KNOWN_METHODS;

/**
 * @param {WELL_KNOWN_METHODS} method
 * @param {OrchestratorRestHelperOptions} options
 * @returns {OrchestratorRestHelperRequestOptions}
 */
function optionMapper(method, options) {
    /** @type {number} */
    var port;
    /** @type {Object.<string>|{accept: string}} */
    var headers = options.headers || {};
    /** @type {boolean} */
    var rejectUnauthorized = !options.invalidCertificate;

    if (options.port !== undefined) {
        port = options.port;
    } else {
        port = (!!options.isSecure ? 443 : 80);
    }
    headers['content-type'] = 'application/json';
    headers.accept = 'application/json';
    return {
        method: method,
        hostname: options.hostname,
        port: port,
        headers: headers,
        path: options.path,
        agent: options.agent,
        rejectUnauthorized: rejectUnauthorized
    };
}

/**
 * @param {IncomingMessage} response
 * @param {Array.<Buffer>} buffers
 * @param {OrchestratorRestHelperCallback|undefined} cb
 * @returns {function()}
 */
function reqEndHandler(response, buffers, cb) {
    return function () {
        /** @type {string} */
        var dataString;
        /** @type {number|null} */
        var statusCode = response.statusCode;
        /** @type {Error|{statusCode: number|null}} */
        var err;

        if (cb === undefined) {
            return;
        }
        dataString = Buffer.concat(buffers).toString('utf-8');
        try {
            if (statusCode >= 300) {
                err = new Error("Unexpected status code: " + statusCode);
                err.statusCode = statusCode;
                cb(err, JSON.parse(dataString));
            } else {
                cb(undefined, JSON.parse(dataString));
            }
        } catch (e) {
            e.statusCode = statusCode;
            cb(e, {rawData: dataString, statusCode: statusCode});
        }
    };
}

/**
 * @param {OrchestratorRestHelperCallback} callback
 * @returns {function(IncomingMessage)}
 */
function responseHandlerFactory(callback) {
    return function(res) {
        /** @type {IncomingMessage|EventEmitter} */
        var response = res;
        /** @type {Array.<Buffer>} */
        var buffers = [];

        response.on('data', function (chunk) {
            buffers.push(chunk);
        });
        response.on('end', reqEndHandler(response, buffers, callback));
    };
}

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.getJSON = function (options, callback) {
    var httpModule = !!options.isSecure ? https : http;
    /** @type {ClientRequest|EventEmitter} */
    var request = httpModule.request(
        optionMapper(WELL_KNOWN_METHODS.GET, options),
        responseHandlerFactory(callback)
    );

    request.on('error', function (err) {
        if (callback) {
            callback(err);
        }
    });
    request.end();
};

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {Object} data
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.postJSON = function (options, data, callback) {
    var httpModule = !!options.isSecure ? https : http;
    /** @type {ClientRequest|EventEmitter} */
    var request = httpModule.request(
        optionMapper(WELL_KNOWN_METHODS.POST, options),
        responseHandlerFactory(callback)
    );

    request.on('error', function (err) {
        if (callback) {
            callback(err);
        }
    });
    request.write(JSON.stringify(data));
    request.end();
};

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {Object} data
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.putJSON = function (options, data, callback) {
    var httpModule = !!options.isSecure ? https : http;
    /** @type {ClientRequest|EventEmitter} */
    var request = httpModule.request(
        optionMapper(WELL_KNOWN_METHODS.PUT, options),
        responseHandlerFactory(callback)
    );

    request.on('error', function (err) {
        if (callback) {
            callback(err);
        }
    });
    request.write(JSON.stringify(data));
    request.end();
};

/**
 * @param {boolean} isSecure
 * @param {boolean} invalidCertificate
 * @returns {Agent|undefined}
 */
module.exports.createAgent = function (isSecure, invalidCertificate) {
    if (isSecure && invalidCertificate) {
        return new https.Agent();
    }
};

/**
 * @typedef {Object} OrchestratorRestHelperOptions
 * @property {boolean|undefined} isSecure
 * @property {Agent|undefined} agent
 * @property {boolean|undefined} invalidCertificate
 * @property {string} hostname
 * @property {number|undefined} port
 * @property {Object|undefined} headers
 * @property {string} path
 */

/**
 * @typedef {Object} OrchestratorRestHelperRequestOptions
 * @property {WELL_KNOWN_METHODS} method
 * @property {string} hostname
 * @property {number} port
 * @property {Object|undefined} headers
 * @property {string} path
 * @property {Agent|undefined} agent
 */

/** @typedef {function(err: Error|undefined, data: Object=)} OrchestratorRestHelperCallback */
