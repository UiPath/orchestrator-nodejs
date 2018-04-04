'use strict';

// native
var http = require('http');
var https = require('https');

/** @enum {string} */
var WELL_KNOWN_METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};
module.exports.WELL_KNOWN_METHODS = WELL_KNOWN_METHODS;

/**
 * @param {WELL_KNOWN_METHODS} method
 * @param {OrchestratorRestHelperOptions} options
 * @param {string|undefined} data
 * @returns {OrchestratorRestHelperRequestOptions}
 */
function optionMapper(method, options, data) {
    /** @type {number} */
    var port;
    /** @type {Object.<string>|{accept: string}} */
    var headers = options.headers || {};
    /** @type {boolean} */
    var rejectUnauthorized = !options.invalidCertificate;

    if (options.port !== undefined) {
        port = options.port;
    } else {
        port = (options.isSecure ? 443 : 80);
    }
    if (data !== undefined) {
        headers['content-type'] = 'application/json';
        headers['content-length'] = Buffer.byteLength(data, 'utf8');
    }
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
        var err = null;
        /** @type {*} */
        var result = null;

        if (cb === undefined) {
            return;
        }
        dataString = Buffer.concat(buffers).toString('utf-8');
        if (dataString.length > 0) {
            try {
                result = JSON.parse(dataString);
            } catch (e) {
                err = e;
                e.rawData = dataString;
            }
        }
        if (err === null && statusCode >= 300) {
            err = new Error("Unexpected status code: " + statusCode);
        }
        if (err === null) {
            cb(undefined, result);
        } else {
            err.statusCode = statusCode;
            cb(err, result);
        }
    };
}

/**
 * @param {OrchestratorRestHelperCallback} callback
 * @returns {function(IncomingMessage)}
 */
function responseHandlerFactory(callback) {
    return function (res) {
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
 * @param {WELL_KNOWN_METHODS} method
 * @param {OrchestratorRestHelperOptions} options
 * @param {Object|undefined} data
 * @param {OrchestratorRestHelperCallback} callback
 */
function genericRequestHandler(method, options, data, callback) {
    var httpModule = options.isSecure ? https : http;
    /** @type {string} */
    var dataStr;
    /** @type {ClientRequest|EventEmitter} */
    var request;

    if (data !== undefined) {
        dataStr = JSON.stringify(data);
    }
    request = httpModule.request(
        optionMapper(method, options, dataStr),
        responseHandlerFactory(callback)
    );
    request.on('error', function (err) {
        if (callback) {
            callback(err);
        }
    });
    if (data !== undefined) {
        request.write(dataStr, 'utf8');
    }
    request.end();
}

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.getJSON = function (options, callback) {
    genericRequestHandler(
        WELL_KNOWN_METHODS.GET,
        options,
        undefined,
        callback
    );
};

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {Object} data
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.postJSON = function (options, data, callback) {
    genericRequestHandler(
        WELL_KNOWN_METHODS.POST,
        options,
        data,
        callback
    );
};

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {Object} data
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.putJSON = function (options, data, callback) {
    genericRequestHandler(
        WELL_KNOWN_METHODS.PUT,
        options,
        data,
        callback
    );
};

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {Object} data
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.patchJSON = function (options, data, callback) {
    genericRequestHandler(
        WELL_KNOWN_METHODS.PATCH,
        options,
        data,
        callback
    );
};

/**
 * @param {OrchestratorRestHelperOptions} options
 * @param {OrchestratorRestHelperCallback} callback
 */
module.exports.delete = function (options, callback) {
    genericRequestHandler(
        WELL_KNOWN_METHODS.DELETE,
        options,
        undefined,
        callback
    );
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
