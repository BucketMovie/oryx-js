'use strict';

var request = require('request');

module.exports = function (uri) {
    return {
        set: function (user_id, item_id, value, callback) {
            request({
                method: 'POST',
                uri: uri + '/pref/' + user_id + '/' + item_id,
                body: value.toString()
            }, callback);
        },
        delete: function (user_id, item_id, callback) {
            request({
                method: 'POST',
                uri: uri + '/pref/' + user_id + '/' + item_id
            }, callback);
        }
    }
}
