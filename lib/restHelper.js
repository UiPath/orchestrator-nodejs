'use strict';

// native
var compat = require('./compat');

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
    }
    headers.accept = 'application/json';
    return {
        method: method,
        hostname: options.hostname,
        port: port,
        isSecure: options.isSecure,
        headers: headers,
        path: options.path,
        agent: options.agent,
        rejectUnauthorized: rejectUnauthorized
    };
}

/**
 * @param {WELL_KNOWN_METHODS} method
 * @param {OrchestratorRestHelperOptions} options
 * @param {Object|undefined} data
 * @param {OrchestratorRestHelperCallback} callback
 */
function genericRequestHandler(method, options, data, callback) {
    /** @type {string} */
    var dataStr;

    if (data !== undefined) {
        dataStr = JSON.stringify(data);
    }
    compat.request(
        optionMapper(method, options, dataStr),
        dataStr,
        callback
    );
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
        return compat.createAgent();
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
 * @property {boolean} isSecure
 * @property {Object|undefined} headers
 * @property {string} path
 * @property {Agent|undefined} agent
 */

/** @typedef {function(err: Error|undefined, data: Object=)} OrchestratorRestHelperCallback */
