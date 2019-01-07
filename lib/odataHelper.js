'use strict';

/** @type {string} */
var ODATA_TYPE_KEY_SUFFIX = '@odata.type';
/** @type {string} */
var ODATA_TYPE_STRING = '#String';

/**
 * @param {Object} data
 * @returns {Object}
 */
function recursiveStringAnnotation(data) {
    var i, keys, len;
    /** @type {string} */
    var key, type;
    /** @type {Object} */
    var output;
    /** @type {Object} */
    var current;

    if (Array.isArray(data)) {
        output = [];
        for (i = 0, len = data.length; i < len; i += 1) {
            current =data[i];
            if (typeof current === 'object') {
                output.push(recursiveStringAnnotation(current));
            } else {
                output.push(current);
            }
        }
    } else {
        output = {};
        keys = Object.keys(data);
        for (i = 0, len = keys.length; i < len; i += 1) {
            key = keys[i];
            current = data[key];
            type = typeof current;
            if (type === 'object' && current !== null) {
                output[key] = recursiveStringAnnotation(current);
            } else if (type === 'string') {
                output[key] = current;
                output[key + ODATA_TYPE_KEY_SUFFIX] = ODATA_TYPE_STRING;
            } else {
                output[key] = current;
            }
        }
    }
    return output;
}

/**
 * Annotate string types according to odata specs as annotated in the following page:
 * https://orchestrator.uipath.com/reference/#section-post-requests
 * Returns a deep copy
 * @param {Object} data
 * @returns {Object}
 */
module.exports.annotateStrings = function (data) {
    if (typeof data !== 'object' || data === null) {
        return data;
    }
    return recursiveStringAnnotation(data);
};
