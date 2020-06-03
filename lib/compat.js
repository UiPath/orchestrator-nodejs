/*
This is a compatibility layer meant to make the code work with either Node.JS and other environments (e.g. Browser)
 */

'use strict';

/**
 * @param {AxiosInstance} axios
 * @param {OrchestratorRestHelperRequestOptions} options
 * @param {string} data
 * @param {OrchestratorRestHelperCallback} [callback]
 */
function axiosHttpRequest(axios, options, data, callback) {
    /** @type {AxiosRequestConfig} */
    var axiosOptions = {
        method: options.method,
        url: (options.isSecure ? 'https' : 'http') + '://' + options.hostname + ':' + options.port + options.path,
        headers: options.headers,
        data: data
    };

    axios.request(axiosOptions).then(function (response) {
        /** @type {Error|{statusCode: number|null}} */
        var err;

        if (response.status >= 300) {
            err = new Error("Unexpected status code: " + response.status);
            err.statusCode = response.status;
        }
        callback(err, response.data);
    }).catch(function (error) {
        if (error) {
            error.statusCode = error && error.response && error.response.status;
        }
        callback(error, error && error.response && error.response.data);
    });
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
 * @param {http} httpModule
 * @param {OrchestratorRestHelperRequestOptions} options
 * @param {string} data
 * @param {OrchestratorRestHelperCallback} [callback]
 */
function nodeHttpRequest(httpModule, options, data, callback) {
    /** @type {ClientRequest|EventEmitter} */
    var request;

    if (data !== undefined) {
        options.headers['content-length'] = Buffer.byteLength(data, 'utf8').toString();
    }
    request = httpModule.request(options, responseHandlerFactory(callback));
    request.on('error', function (err) {
        if (callback) {
            callback(err);
        }
    });
    if (data !== undefined) {
        request.write(data, 'utf8');
    }
    request.end();

}

/**
 * Wrapper function to handle requests consistently (regardless of the module used)
 * @param {AxiosInstance|undefined} axios
 * @param {http|undefined} httpModule
 * @param {https|undefined} httpsModule
 * @param {OrchestratorRestHelperRequestOptions} options
 * @param {string} data
 * @param {OrchestratorRestHelperCallback} [callback]
 */
function httpRequest(axios, httpModule, httpsModule, options, data, callback) {
    if (axios) {
        axiosHttpRequest(axios, options, data, callback);
        return;
    }
    // Assume Node.JS
    if (options.isSecure) {
        nodeHttpRequest(httpsModule, options, data, callback);
        return;
    }
    nodeHttpRequest(httpModule, options, data, callback);
}

/**
 * @param {AxiosInstance|undefined} axios
 * @param {http|undefined} httpModule
 * @param {https|undefined} httpsModule
 * @returns {function(options: OrchestratorRestHelperRequestOptions, data: string, callback: OrchestratorRestHelperCallback=)}
 */
function requestFuncFactory(axios, httpModule, httpsModule) {
    return function (options, data, callback) {
        httpRequest(axios, httpModule, httpsModule, options, data, callback);
    };
}

/**
 * @param {https} [httpsModule]
 * @returns {function(): Agent|undefined}
 */
function createAgentFuncFactory(httpsModule) {
    return function () {
        if (httpsModule) {
            return new httpsModule.Agent();
        }
        return undefined;
    };
}

try {
    // Try assuming Node.JS
    var querystring = require('querystring');
    var pathModule = require('path').posix;
    var http = require('http');
    var https = require('https');
    var util = require('util');

    module.exports = {
        querystring: querystring,
        pathModule: pathModule,
        request: requestFuncFactory(undefined, http, https),
        createAgent: createAgentFuncFactory(https),
        util: util
    };
} catch (e) {
    // We failed to require the modules, assuming we are not in Node.JS
    var axios = require('axios').default;
    var queryString = require('query-string');
    var pathPosix = require('path-posix');
    var formatUtil = require('format-util');

    module.exports = {
        querystring: {encode: queryString.stringify},
        pathModule: pathPosix,
        request: requestFuncFactory(axios, undefined, undefined),
        createAgent: createAgentFuncFactory(),
        util: {format: formatUtil}
    };
}
