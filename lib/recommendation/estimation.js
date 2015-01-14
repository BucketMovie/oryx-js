'use strict';

var request = require('request');

module.exports = function (uri) {
    return {
        get: function (user_id, item_ids, callback) {
            var items = '';
            item_ids.forEach(function (id) {
                items += ('/' + id);
            });

            request({
                method: 'GET',
                uri: uri + '/estimate/' + user_id + items
            }, callback);
        },
        /**
         * scoreParams : [ { id: X, val: X }, ... ]
         */
        getForAnonymous: function (item_id, scoreParams, callback) {
            var params = '';
            scoreParams.forEach(function (s) {
                params += ('/' + s.id + '=' + s.val);
            });

            request({
                method: 'GET',
                uri: uri + '/estimateForAnonymous/' + item_id + params
            }, callback);
        }
    }
}
