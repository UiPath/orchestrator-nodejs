'use strict';

var util = require('util');

var Orchestrator = require('..');

var TEST_ENVIRONMENT = {
    usernameOrEmailAddress: 'my.address@company.com', // usually the email address used to login
    tenancyName: 'myTenancy',                           // the tenancy name to use
    hostname: 'orchestrator.company.com'               // hostname where Orchestrator is hosted (root level assumed for now)
};

/**
 * Based on the code from the following discussion:
 * https://stackoverflow.com/questions/24037545/how-to-hide-password-in-the-nodejs-console
 * @param {function(password: string)} callback
 */
function askForPassword(callback) {
    var readline = require('readline');
    // noinspection JSUnresolvedVariable
    var Writable = require('stream').Writable;
    var rl;
    var mutableStdout = new Writable({
        write: function (chunk, encoding, callback) {
            // noinspection JSLint
            if (!this.muted) {
                process.stdout.write(chunk, encoding);
            }
            callback();
        }
    });
    mutableStdout.muted = false;
    rl = readline.createInterface({
        input: process.stdin,
        output: mutableStdout,
        terminal: true
    });

    rl.question('Password: ', function (password) {
        callback(password);
        rl.close();
    });
    mutableStdout.muted = true;
}

askForPassword(function (password) {
    /** @type {number} */
    var startTimestamp = Date.now();
    /** @type {Orchestrator} */
    var test = new Orchestrator({
        usernameOrEmailAddress: TEST_ENVIRONMENT.usernameOrEmailAddress,
        tenancyName: TEST_ENVIRONMENT.tenancyName,
        password: password,
        hostname: TEST_ENVIRONMENT.hostname
    });

    /** @param {number} count */
    function testGetUsers(count) {
        test.get('/odata/Users', {}, function (err, data) {
            console.log('This is attempt #' + count + ': ' + (Date.now() - startTimestamp));
            if (err) {
                console.error('Error: ' + err);
            }
            console.log('Data: ' + util.inspect(data));
        });
    }

    // by executing multiple requests without waiting we validate the queueing behavior
    testGetUsers(1);
    testGetUsers(2);
    test.v2.odata.getUsers({}, function (err, data) {
        console.log('This is attempt #3: ' + (Date.now() - startTimestamp));
        if (err) {
            console.error('Error: ' + err);
        }
        console.log('Data: ' + util.inspect(data));
    });
});
