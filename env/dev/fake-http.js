"use strict";
var di = require('mvcjs'),
    Type = di.load('typejs'),
    HttpServiceInterface = di.load('interface/http'),
    core = di.load('core'),
    HttpService;


HttpService = HttpServiceInterface.inherit({
    server: Type.OBJECT,
    config: Type.OBJECT,
    events: Type.OBJECT
}, {
    _construct: function HttpService(config) {
        this.config = {
            encoding: 'utf8'
        };
        this.events = {};
        this.server = {};
    },
    getEncoding: function HttpService_getEncoding() {
        return this.config.encoding;
    },
    fire: function (name, request, response) {
        var callback = this.events[name];
        callback(request, response);
    },
    on: function HttpService_on(name, callback) {
        this.events[name] = callback;
    },
    listen: function HttpService_listen() {

    },
    close: function HttpService_close() {

    },
    setTimeout: function HttpService_setTimeout() {

    }
});


module.exports = HttpService;