'use strict';

var util = require('util');

var Orchestrator = require('..');

var TEST_ENVIRONMENT = {
    refreshToken: 'qwertyuiopasdfghjkllzxcvbnmQWERTYUIOPASDFGHJK',
    serviceInstanceLogicalName: 'myInstanceLogicalName',
    path: 'myAccountLogicalName/myInstanceLogicalName'
};

(function () {
    /** @type {number} */
    var startTimestamp = Date.now();
    /** @type {Orchestrator} */
    var test = new Orchestrator(TEST_ENVIRONMENT);

    /** @param {number} count */
    function testGetProcessSchedules(count) {
        test.get('/odata/ProcessSchedules', {}, function (err, data) {
            console.log('This is attempt #' + count + ': ' + (Date.now() - startTimestamp));
            if (err) {
                console.error('Error: ' + err);
            }
            console.log('Data: ' + util.inspect(data));
        });
    }

    // by executing multiple requests without waiting we validate the queueing behavior
    testGetProcessSchedules(1);
    testGetProcessSchedules(2);
    test.v2.odata.getProcessSchedules({}, function (err, data) {
        console.log('This is attempt #3: ' + (Date.now() - startTimestamp));
        if (err) {
            console.error('Error: ' + err);
        }
        console.log('Data: ' + util.inspect(data));
    });
})();
