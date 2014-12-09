'use strict';

var request = require('request');
var defaultOptions = {
    host: 'localhost',
    port: '8091',
    username: null,
    password: null
}

function OryxService (options) {
    var uri = 'http://' + options.host + ':' + options.port;

    this.ingest = function (data, callback) {
        request({
            method: 'POST',
            uri: uri + '/ingest',
            body: data
        }, callback);
    };

    this.ready = function (callback) {
        request({
            method: 'GET',
            uri: uri + '/ready'
        }, callback);
    };

    this.refresh = function (callback) {
        request({
            method: 'POST',
            uri: uri + '/refresh'
        }, callback);
    };

    this.recommendation = require('./recommendation')(uri);
    this.similarity = require('./similarity')(uri);
    this.estimation = require('./estimation')(uri);
    this.preference = require('./preference')(uri);
};

module.exports = function (options) {
    return new OryxService(options);
};
