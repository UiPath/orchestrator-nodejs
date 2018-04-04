'use strict';

var WELL_KNOWN_METHODS = require('./restHelper').WELL_KNOWN_METHODS;

/**
 * @param {Orchestrator} orchestrator
 * @param {string} path
 * @constructor
 */
function RestGroup(orchestrator, path) {
    /**
     * @type {Orchestrator}
     * @private
     */
    this._orchestrator = orchestrator;
    /**
     * @type {string}
     * @private
     */
    this._path = path;
}

module.exports = RestGroup;

/**
 * @param {RestGroup} restGroup
 * @param {string} name
 */
function checkNameExistence(restGroup, name) {
    if (restGroup[name] !== undefined) {
        throw new Error('RestGroup member already exists: ' + name);
    }
}

/**
 * @param {string} name
 * @param {WELL_KNOWN_METHODS} method
 * @param {string} path
 * @protected
 */
RestGroup.prototype.graftLeaf = function (name, method, path) {
    /** @type {Orchestrator} */
    var orchestrator = this._orchestrator;
    var absolutePath = this._path + path;

    checkNameExistence(this, name);
    switch (method) {
    case WELL_KNOWN_METHODS.GET:
        this[name] = function (query, callback) {
            orchestrator.get(
                absolutePath,
                query,
                callback
            );
        };
        break;
    case WELL_KNOWN_METHODS.POST:
        this[name] = function (data, callback) {
            orchestrator.post(
                absolutePath,
                data,
                callback
            );
        };
        break;
    case WELL_KNOWN_METHODS.PUT:
        this[name] = function (data, callback) {
            orchestrator.put(
                absolutePath,
                data,
                callback
            );
        };
        break;
    case WELL_KNOWN_METHODS.DELETE:
        this[name] = function (callback) {
            orchestrator.delete(
                absolutePath,
                callback
            );
        };
        break;
    default:
        throw new Error('Unsupported method: ' + method);
    }
};

/**
 * @param {string} name
 * @param {function} wrapperFunc
 * @protected
 */
RestGroup.prototype.graftLeafCustom = function (name, wrapperFunc) {
    checkNameExistence(this, name);
    this[name] = wrapperFunc(this._orchestrator);
};

/**
 * @param {string} name
 * @param {string} path
 * @returns {RestGroup}
 * @protected
 */
RestGroup.prototype.graftNode = function (name, path) {
    /** @type {RestGroup} */
    var newRestGroup;

    checkNameExistence(this, name);
    newRestGroup = new RestGroup(
        this._orchestrator,
        this._path + path
    );
    this[name] = newRestGroup;
    return newRestGroup;
};


/** @typedef {function(query:Object, OrchestratorRestHelperCallback)} OrchestratorGetHelper */

/** @typedef {function(data:Object, OrchestratorRestHelperCallback)} OrchestratorPostHelper */

/** @typedef {function(data:Object, OrchestratorRestHelperCallback)} OrchestratorPutHelper */

/** @typedef {function(OrchestratorRestHelperCallback)} OrchestratorDeleteHelper */

