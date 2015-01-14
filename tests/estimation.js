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
            content.push(line);
        }
    });
    return content;
}

describe('estimation', function () {
    it('should get estimation for user 1 to item 812 and 648', function (done) {
        OryxService.estimation.get(1, [812, 648], function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 2);
            done();
        });
    });

    it('should get anonymous estimation for items 8587', function (done) {
        var scores = [
            {
                id: 812,
                val: .7
            },
            {
                id: 7443,
                val: .2
            }
        ];

        OryxService.estimation.getForAnonymous(8587, scores, function (err, res, body) {
            assert(!err);
            assert.equal(body, 0.011238764);
            done();
        });
    });
});
