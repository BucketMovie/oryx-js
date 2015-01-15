'use strict';

var request = require('request');

module.exports = function (uri) {
    return {
        get: function (user_id, count, offset, callback) {
            if (!count) {
                count = 10;
            }
            if (!offset) {
                offset = 0;
            }
            request({
                method: 'GET',
                uri: uri + '/recommend/' + user_id + '?howMany=' + count + '&offset=' + offset
            }, callback);
        },
        getToMany: function (user_ids, count, offset, callback) {
            var ids = '';
            user_ids.forEach(function (id) {
                ids += ('/' + id);
            });
            if (!count) {
                count = 10;
            }
            if (!offset) {
                offset = 0;
            }

            request({
                method: 'GET',
                uri: uri + '/recommendToMany' + ids + '?howMany=' + count + '&offset=' + offset
            }, callback);
        },
        /**
         * scoreParams : [ { id: X, val: X }, ... ]
         */
        getForAnonymous: function (scoreParams, count, offset, callback) {
            var params = '';
            scoreParams.forEach(function (s) {
                params += ('/' + s.id + '=' + s.val);
            });
            if (!count) {
                count = 10;
            }
            if (!offset) {
                offset = 0;
            }

            request({
                method: 'GET',
                uri: uri + '/recommendToAnonymous' + params + '?howMany=' + '&offset=' + offset
            }, callback);
        }
    }
}
