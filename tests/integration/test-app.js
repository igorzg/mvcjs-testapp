


function Model() {}

Model.types = {};
Model.types.Mixed = {};
Model.findOne = function (url, callback) {
    callback(false, {
        text: '<h5>SOME_TEXT</h5>',
        pageTitle: 'CUSTOM_TITLE',
        pageDesc: 'CUSTOM_DESC'
    });
};

function Menu() {}
Menu.find = function (callback) {
    callback(false, [
        {
            "title": "Home",
            "link": "/",
            "alt": "",
            "route": "",
            "blank": false
        },
        {
            "title": "Error handling",
            "link": "/error/handler",
            "alt": "",
            "route": "home/handleError",
            "blank": false
        },
        {
            "title": "TDD",
            "link": "/guide/tdd",
            "alt": "",
            "route": "home/content",
            "blank": false
        }
    ]);
};
Menu.findOne = function (url, callback) {
    var forward = [
        '/',
        '/nonexist',
        '/error'
    ];
    //console.log('forward.indexOf(url.link)', forward.indexOf(url.link), url.link);
    if (forward.indexOf(url.link) > -1) {
        callback(false, {});
    } else {
        callback(false, {
            route: 'home/content',
            query: {}
        });
    }
};

function mongo() {}
mongo.types = {};
mongo.types.Mixed = {};
mongo.schema = function () {};
mongo.model = function (name) {
    if (name === 'Content') {
        return Model;
    }
    return Menu;
};

var di = require('mvcjs');
var component = di.load('core/component');
/*
component.set('core/logger', {}, function () {
    return {
        print: function () {},
        addHook: function () {}
    }
});*/

component.set('db/mongo', {}, function () {
    return mongo;
});

var framework = di.load('bootstrap');
framework.setBasePath(__dirname + '/../../');
framework.init('app/', '../env/dev/test-env.json');


module.exports = component.get('core/http');