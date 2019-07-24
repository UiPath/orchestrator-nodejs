'use strict';

// native
var util = require('util');
var crypto = require('crypto');
var querystring = require('querystring');
var https = require('https');

// 3rd party
var base64url = require('base64-url');

// noinspection SpellCheckingInspection
/** @enum {string, string} */
var PARAM = {
    response_type: 'code',
    grant_type: 'authorization_code',
    code_challenge_method: 'S256',
    scope: 'openid+profile+offline_access+email ',
    audience: 'https://orchestrator.cloud.uipath.com',
    client_id: '5v7PmPJL6FOGu6RB8I1Y4adLBhIwovQN',
    redirect_uri: 'https://account.uipath.com/mobile',
    accountHost: 'account.uipath.com',
    platformHost: 'platform.uipath.com',
    authorizeEndpoint: '/authorize',
    tokenEndpoint: '/oauth/token',
    accountForUserEndpoint: '/cloudrpa/api/getAccountsForUser',
    allServiceInstancesEndpoint: '/cloudrpa/api/account/%s/getAllServiceInstances'
};

/**
 * @param {function(url: string, verifier: string)} callback
 */
module.exports.getURL = function (callback) {
    /** @type {string} */
    var verifier = base64url.encode(crypto.randomBytes(32));
    /** @type {string} */
    var challenge = base64url.encode(crypto.createHash('sha256').update(verifier).digest());
    /** @type {string} */
    var nonce = crypto.randomBytes(16).toString('hex');
    /** @type {string} */
    var query = querystring.stringify({
        response_type: PARAM.response_type,
        nonce: nonce,
        code_challenge: challenge,
        code_challenge_method: PARAM.code_challenge_method,
        scope: PARAM.scope,
        audience: PARAM.audience,
        client_id: PARAM.client_id,
        redirect_uri: PARAM.redirect_uri
    }, null, null, {encodeURIComponent: encodeURI});
    callback('https://' + PARAM.accountHost + PARAM.authorizeEndpoint + '?' + query, verifier);
};

function responseHandlerFactory (callback) {
    return function (res) {
        /** @type {Array.<Buffer>} */
        var data = [];

        res.on('error', callback);
        res.on('data', function (chunk) {
            data.push(chunk);
        });
        res.on('end', function () {
            /** @type {string} */
            var responsePayload = Buffer.concat(data).toString();
            /** @type {Object} */
            var parsedResponse = null;
            /** @type {Error} */
            var error;

            try {
                parsedResponse = JSON.parse(responsePayload);
            } catch (e) {
                error = e;
            }
            callback(error, parsedResponse);
        });
    };
}

/**
 * @param {string} code
 * @param {string} verifier
 * @param {function(Error|undefined, refresh_token: string=, access_token: string=, id_token: string=)} callback
 */
module.exports.getRefreshToken = function (code, verifier, callback) {
    /** @type {string} */
    var requestPayload = JSON.stringify({
        grant_type: PARAM.grant_type,
        code: code,
        redirect_uri: PARAM.redirect_uri,
        code_verifier: verifier,
        client_id: PARAM.client_id
    });
    /** @type {Object} */
    var requestOptions = {
        host: PARAM.accountHost,
        path: PARAM.tokenEndpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestPayload)
        }
    };
    var req = https.request(requestOptions, responseHandlerFactory(
        /**
         * @param {Error} err
         * @param {{refresh_token: string, access_token: string, id_token: string}} response
         */
        function (err, response) {
            callback(
                err,
                response && response.refresh_token,
                response && response.access_token,
                response && response.id_token
            );
        }
    ));
    req.end(requestPayload);
};

/**
 * @param {string} idToken
 * @param {function(Error, Array.<{accountName: string, accountLogicalName: string}>)} callback
 */
module.exports.getAccountLogicalName = function (idToken, callback) {
    /** @type {Object} */
    var requestOptions = {
        host: PARAM.platformHost,
        path: PARAM.accountForUserEndpoint,
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + idToken}
    };
    https.request(requestOptions, responseHandlerFactory(
        /**
         * @param {Error} err
         * @param {{accounts: Array.<{accountName: string, accountLogicalName: string}>}} response
         */
        function (err, response) {
            callback(
                err,
                response && response.accounts
            );
        }
    )).end();
};

/**
 * @param {string} idToken
 * @param {string} accountLogicalName
 * @param {function(Error|undefined, instances: Array.<{serviceInstanceName: string, serviceInstanceLogicalName: string}>)} callback
 */
module.exports.getInstanceLogicalName = function (idToken, accountLogicalName, callback) {
    /** @type {Object} */
    var requestOptions = {
        host: PARAM.platformHost,
        path: util.format(PARAM.allServiceInstancesEndpoint, accountLogicalName),
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + idToken}
    };
    https.request(requestOptions, responseHandlerFactory(
        /**
         * @param {Error} err
         * @param {Array.<{serviceInstanceName: string, serviceInstanceLogicalName: string}>} response
         */
        function (err, response) {
            callback(
                err,
                response
            );
        }
    )).end();
};
