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

describe('similarity', function () {
    it('should get 10 similarity for item 812', function (done) {
        OryxService.similarity.get([812], 10, 0, function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 10);
            done();
        });
    });

    it('should get 10 similarity for items 8587 and 648 to item 812', function (done) {
        OryxService.similarity.getToItem(812, [8587, 648], function (err, res, body) {
            assert(!err);
            var data = parseCSV(body);
            assert.equal(data.length, 10);
            done();
        });
    });
});
