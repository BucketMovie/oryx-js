'use strict';

var options = {
    host: 'localhost',
    port: '8091',
    user: null,
    password: null
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

describe('recommendations', function () {
    it('should get 10 recommendations for user 1', function (done) {
        OryxService.recommendation.get(1, 10, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 10);
            done();
        });
    });

    it('should get 10 recommendations for users 1 & 2', function (done) {
        OryxService.recommendation.getToMany([1, 2], 10, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 10);
            done();
        });
    });

    it('should get 8 recommendations for anonymous user', function (done) {
        var scores = [
            { id: 8587, val: .7 },
            { id: 7443, val: .2 }
        ];

        OryxService.recommendation.getForAnonymous(scores, 8, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 8);
            done();
        });
    });

    it('should get 10 items justifying recommendation of item 11224 to user 1', function (done) {
        OryxService.recommendation.getBecause(1, 11224, 10, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 10);
            done();
        });
    });

    it('Should get the 5 most popular items', function (done) {
        OryxService.recommendation.getMostPopular(5, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 5);
            done();
        });
    })
});
