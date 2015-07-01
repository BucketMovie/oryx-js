'use strict';

var options = {
    host: '176.31.249.9',
    port: '8093',
    user: null,
    password: null
};

var assert = require('assert'),
    Q = require('q');

var OryxService = require('../lib/index.js')(options),
    setPref = Q.denodeify(OryxService.preference.set);

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
    it('should set empty preference for user 1 and item 404', function (done) {
        setPref(1, 404).then(function (res) {
            assert.equal(res[0].body, "");
            assert.equal(res[0].statusCode, 200)
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
