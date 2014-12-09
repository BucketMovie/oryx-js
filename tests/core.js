'use strict';

var options = {
    host: 'localhost',
    port: '8091',
    user: null,
    password: null
};

var assert = require('assert');

var OryxService = require('../lib/index.js')(options);

describe('core', function () {
    it('should check that oryx is ready', function (done) {
        OryxService.ready(function (err, res, body) {
            assert(!err);
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should refresh oryx', function (done) {
        OryxService.refresh(function (err, res, body) {
            assert(!err);
            assert.equal(res.statusCode, 200);
            done();
        });
    });
});
