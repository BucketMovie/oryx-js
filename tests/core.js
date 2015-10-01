'use strict';

var options = {
    host: 'localhost',
    port: '8091',
    user: null,
    password: null,
    user_id: '',
    user_total_items: 10
};

var assert = require('assert');

var OryxService = require('../lib/index.js')(options);

var parseCSV = function (csv) {
    var lines = csv.split('\n');
    var content = [];
    lines.forEach(function (line, index) {
        if (index != lines.length - 1) {
            var data = line.split(',');
            content.push({
                id: data[0],
                proximity: data[1]
            });
        }
    });
    return content;
}

describe('core', function () {
    it('should check that oryx is ready', function (done) {
        OryxService.core.ready(function (err, res, body) {
            assert(!err);
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should refresh oryx', function (done) {
        OryxService.core.refresh(function (err, res, body) {
            assert(!err);
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should get 10 items justifying recommendation of item 11224 to user 1', function (done) {
        OryxService.core.getBecause(1, 11224, 10, 0, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 10);
            done();
        });
    });

    it('Should get the 5 most popular items', function (done) {
        OryxService.core.getMostPopularItems(5, 0, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 5);
            done();
        });
    });
    
    it('Should get the known items of a user', function (done) {
        OryxService.core.getKnownItems(options.user_id, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, options.user_total_items);
            done();
        });
    })
});
