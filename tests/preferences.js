'use strict';

var options = {
    host: 'localhost',
    port: '8091',
    user: null,
    password: null
};

var assert = require('assert');

var OryxService = require('../lib/index.js')(options);

describe('preferences', function () {
    it('should set preference for user 1 and item 404', function (done) {
        OryxService.preference.set(1, 404, 0.8, function (err, res, body) {
            assert(!err);
            assert.equal(body, "");
            done();
        });
    });

    it('should remove preference for user 1 and item 404', function (done) {
        OryxService.preference.delete(1, 404, function (err, res, body) {
            assert(!err);
            assert.equal(body, "");
            done();
        });
    });
});
