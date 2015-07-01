'use strict';

var request = require('request');

module.exports = function (uri) {
    return {
        set: function (user_id, item_id, value, callback) {
            if (!callback) {
                callback = value;
                value = null;
            }
            request({
                method: 'POST',
                uri: uri + '/pref/' + user_id + '/' + item_id,
                body: (value) ? value.toString() : undefined
            }, callback);
        },
        delete: function (user_id, item_id, callback) {
            request({
                method: 'DELETE',
                uri: uri + '/pref/' + user_id + '/' + item_id
            }, callback);
        }
    }
}
