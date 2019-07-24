'use strict';

// 3rd party
var open = require('open');

// local
var oauth = require('./lib/oauth');
var userInput = require('./lib/userInput');

/**
 * @param {string} idToken
 * @param {Array.<{accountName: string, accountLogicalName: string}>} accounts
 * @param {Array.<{account: {accountName: string, accountLogicalName: string}, serviceInstances: Array.<{serviceInstanceName: string, serviceInstanceLogicalName}>}>} results
 * @param {function(Error=)} callback
 */
function getAllServiceInstanceLogicalNames(idToken, accounts, results, callback) {
    /** @type {{accountName: string, accountLogicalName: string}} */
    var current = accounts.shift();

    if (!current) {
        callback();
        return;
    }
    oauth.getInstanceLogicalName(idToken, current.accountLogicalName, function (err, instances) {
        if (err) {
            callback(err);
            return;
        }
        results.push({account: current, serviceInstances: instances});
        getAllServiceInstanceLogicalNames(idToken, accounts, results, callback);
    });
}

oauth.getURL(function (url, verifier) {
    open(url);
    userInput.askForCode(function (code) {
        oauth.getRefreshToken(code, verifier, function (err, refreshToken, accessToken, idToken) {
            if (err) {
                console.error(err);
                return;
            }
            oauth.getAccountLogicalName(idToken, function (err, accounts) {
                /** @type {Array.<{account: {accountName: string, accountLogicalName: string}, serviceInstances: Array.<{serviceInstanceName: string, serviceInstanceLogicalName}>}>} */
                var logicalNames = [];

                if (err) {
                    console.error(err);
                    return;
                }
                //console.log(util.inspect(accounts));
                getAllServiceInstanceLogicalNames(idToken, accounts, logicalNames, function (err) {
                    var i, j;
                    /** @type {{account: {accountName: string, accountLogicalName: string}, serviceInstances: Array.<{serviceInstanceName: string, serviceInstanceLogicalName}>}} */
                    var current;
                    /** @type {{serviceInstanceName: string, serviceInstanceLogicalName}} */
                    var currentServiceInstance;

                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Refresh token: ' + refreshToken);
                    console.log('\nAccounts / Service Instances list (' + logicalNames.length + '):');
                    for (i = 0; i < logicalNames.length; i += 1) {
                        current = logicalNames[i];
                        console.log('----');
                        console.log('Account: "' + current.account.accountName + '" [' + current.account.accountLogicalName + ']');
                        console.log('Service Instances:');
                        for (j = 0; j < current.serviceInstances.length; j += 1) {
                            currentServiceInstance = current.serviceInstances[j];
                            console.log('  "' + currentServiceInstance.serviceInstanceName + '" [' + currentServiceInstance.serviceInstanceLogicalName + ']');
                        }
                    }
                    console.log('----');
                });
            });
        });
    });
});
