'use strict';

var request = require('request');

module.exports = function (uri) {
    return {
        get: function (user_id, count, callback) {
            if (!count) {
                count = 10;
            }
            request({
                method: 'GET',
                uri: uri + '/recommend/' + user_id + '?howMany=' + count
            }, callback);
        },
        getToMany: function (user_ids, count, callback) {
            var ids = '';
            user_ids.forEach(function (id) {
                ids += ('/' + id);
            });

            request({
                method: 'GET',
                uri: uri + '/recommendToMany' + ids + '?howMany=' + count
            }, callback);
        },
        /**
         * scoreParams : [ { id: X, val: X }, ... ]
         */
        getForAnonymous: function (scoreParams, count, callback) {
            var params = '';
            scoreParams.forEach(function (s) {
                params += ('/' + s.id + '=' + s.val);
            });
            request({
                method: 'GET',
                uri: uri + '/recommendToAnonymous' + params + '?howMany=' + count
            }, callback);
        },
        getBecause: function (user_id, item_id, count, callback) {
            request({
                method: 'GET',
                uri: uri + '/because/' + user_id + '/' + item_id + '?howMany=' + count
            }, callback);
        },
        getMostPopular: function (count, callback) {
            request({
                method: 'GET',
                uri: uri + '/mostPopularItems?howMany=' + count
            }, callback);
        }
    }
}
