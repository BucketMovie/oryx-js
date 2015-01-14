'use strict';

var request = require('request');

module.exports = function (uri) {
    return {
        get: function (item_ids, count, offset, callback) {
            var ids = '';
            item_ids.forEach(function (id) {
                ids += ('/' + id);
            });

            request({
                method: 'GET',
                uri: uri + '/similarity' + ids + '?howMany=' + count + '&offset=' + offset
            }, callback);
        },
        getToItem: function (main_item_id, item_ids, callback) {
            var ids = '';
            item_ids.forEach(function (id) {
                ids += ('/' + id);
            });

            request({
                method: 'GET',
                uri: uri + '/similarityToItem/' + main_item_id + ids
            }, callback);
        }
    }
}
