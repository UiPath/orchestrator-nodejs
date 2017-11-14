'use strict';

var RestGroup = require('../RestGroup');
var api = require('./api');
var odata = require('./odata');

/**
 * @param {RestGroup} restGroup
 * @param {Array.<Array.<string>>} descriptors
 */
function populateRestGroupLeaves(restGroup, descriptors) {
    var i, len;
    /** @type {Array.<string>} */
    var current;
    /** @type {string} */
    var name;
    /** @type {string|WELL_KNOWN_METHODS} */
    var method;
    /** @type {string} */
    var path;

    for (i = 0, len = descriptors.length; i < len; i += 1) {
        current = descriptors[i];
        name = current[0];
        method = current[1];
        path = current[2];
        restGroup.graftLeaf(name, method, path);
    }
}

/**
 * @param {Orchestrator} orchestrator
 * @returns {V2RestGroup}
 */
function v2Factory(orchestrator) {
    /** @type {V2RestGroup|RestGroup} */
    var rootRestGroup = new RestGroup(orchestrator, '/');
    /** @type {RestGroup} */
    var apiRestGroup = rootRestGroup.graftNode('api', 'api/');
    /** @type {RestGroup} */
    var odataRestGroup = rootRestGroup.graftNode('odata', 'odata/');

    populateRestGroupLeaves(apiRestGroup, api);
    populateRestGroupLeaves(odataRestGroup, odata);
    return rootRestGroup;
}

module.exports.v2Factory = v2Factory;

/**
 * @name V2RestGroup
 * @type {RestGroup}
 */

/**
 * @name api
 * @memberOf V2RestGroup
 * @type {RestGroup}
 */

/**
 * @name odata
 * @memberOf V2RestGroup
 * @type {RestGroup}
 */
