'use strict';

var request = require('request');

module.exports = function (uri) {
    return {
        ingest: function (data, callback) {
            request({
                method: 'POST',
                uri: uri + '/ingest',
                body: data
            }, callback);
        },
        ready: function (callback) {
            request({
                method: 'GET',
                uri: uri + '/ready'
            }, callback);
        },
        refresh: function (callback) {
            request({
                method: 'POST',
                uri: uri + '/refresh'
            }, callback);
        },
        getBecause: function (user_id, item_id, count, offset, callback) {
            if (!offset) {
                if (count) {
                    callback = offset;
                }
                offset = 0;
            }
            if (!count) {
                callback = count;
                count = 10;
            }

            request({
                method: 'GET',
                uri: uri + '/because/' + user_id + '/' + item_id + '?howMany=' + count + '&offset=' + offset
            }, callback);
        },
        getMostSurprising: function (count, callback) {
            if (!count) {
                count = 10;
            }

            request({
                method: 'GET',
                uri: uri + '/mostSurprising?howMany=' + count
            }, callback);
        },
        getPopularRepresentativeItems: function (callback) {
            request({
                method: 'GET',
                uri: uri + '/popularRepresentativeItems'
            }, callback);
        },
        getMostActiveUsers: function (count, offset, callback) {
            if (!count) {
                count = 10;
            }
            if (!offset) {
                offset = 0;
            }

            request({
                method: 'GET',
                uri: uri + '/mostActiveUsers?howMany=' + count + '&offset=' + offset
            }, callback);
        },
        getMostPopularItems: function (count, offset, callback) {
            if (!count) {
                count = 10;
            }
            if (!offset) {
                offset = 0;
            }

            request({
                method: 'GET',
                uri: uri + '/mostPopularItems?howMany=' + count + '&offset=' + offset
            }, callback);
        },
        getAllUsers: function (callback) {
            request({
                method: 'GET',
                uri: uri + '/user/allIDs'
            }, callback);
        },
        getAllItems: function (callback) {
            request({
                method: 'GET',
                uri: uri + '/items/allIDs'
            }, callback);
        },
        getKnownItems: function (user_id, callback) {
            request({
                method: 'GET',
                uri: uri + '/knownItems/' + user_id
            }, callback)
        }
    }
}
