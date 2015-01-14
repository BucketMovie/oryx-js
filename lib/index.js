'use strict';

var request = require('request');
var defaultOptions = {
    host: 'localhost',
    port: '8091',
    username: null,
    password: null
}

function OryxService(options) {
    var uri = 'http://' + options.host + ':' + options.port;

    this.core = require('./recommendation/core')(uri);
    this.recommendation = require('./recommendation/recommendation')(uri);
    this.similarity = require('./recommendation/similarity')(uri);
    this.estimation = require('./recommendation/estimation')(uri);
    this.preference = require('./recommendation/preference')(uri);
};

module.exports = function (options) {
    return new OryxService(options);
};
