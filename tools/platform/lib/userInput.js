'use strict';

// native
var readline = require('readline');
var Writable = require('stream').Writable;

module.exports.askForCode = function (callback) {
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

    rl.question('Enter code from the browser address bar: ', function (code) {
        callback(code);
        rl.close();
    });
    //mutableStdout.muted = true;
};
