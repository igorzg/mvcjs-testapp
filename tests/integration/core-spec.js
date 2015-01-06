describe('controllers/core', function () {
    var di = require('mvcjs'),
        component,
        router,
        onEndData,
        Request,
        Type;

    function MenuModel() {}

    MenuModel.find = function (callback) {
        // simulate model data
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
    MenuModel.findOne = function () {};

    beforeEach(function () {

        function mongo() {}

        mongo.schema = function () {};
        mongo.model = function (name) {
            if (name === 'Menu') {
                return MenuModel;
            }
        };

        di.setAlias('appPath', __dirname + '/../../app');
        di.setAlias('basePath', __dirname + '/../../');
        di.setAlias('controllersPath', '@{appPath}/controllers');
        di.setAlias('modelsPath', '@{appPath}/models');
        di.setAlias('core', '@{appPath}/core');
        di.setAlias('widgets', '@{viewsPath}/widgets');

        component = di.load('core/component');
        component.components = {};

        component.set('db/mongo', {}, function () {
            return mongo;
        });
        component.set('core/logger', {}, function () {
            return {
                print: function (a, b, c) {

                }
            }
        });
        component.set("core/view", {
            "themes": "@{appPath}/themes/",
            "views": "@{appPath}/views/",
            "theme": "default",
            "cache": false
        });
        component.set('hooks/request', {});
        router = component.set('core/router', {
            "errorRoute": "core/error"
        });
        router.add({
            pattern: '/',
            route: 'home/index'
        });

        di.load('@{basePath}/env/dev/widget')(component, di);

        // view = component.get("core/view");
        Type = di.load('typejs');
        // mock request with local component each time because mock will reset cache
        Request = di.mock('core/request', {
            'interface/controller': di.load('interface/controller'),
            'core/component': component,
            'url': di.load('url'),
            'typejs': Type,
            'core': di.load('core'),
            'error': di.load('error'),
            'util': di.load('util'),
            'promise': di.load('promise')
        });
    });


    it('/core/error', function (done) {
        var request = {
            method: 'GET',
            on: function () {
            }
        };
        var response = {
            writeHead: function () {
            },
            end: function (data) {
                onEndData = data;
            }
        };
        var parseRequest = new Request(
            {
                request: request,
                response: response
            },
            '/nonexist'
        );
        spyOn(response, 'end').and.callThrough();

        parseRequest.parse.call(parseRequest).then(function () {
            expect(onEndData.indexOf('STACK') > -1).toBe(true);
            expect(onEndData.indexOf('HttpError: 404') > -1).toBe(true);
            expect(onEndData.indexOf('Not found') > -1).toBe(true);
            expect(response.end).toHaveBeenCalled();
            done();
        }, function (error) {
            console.log('error', error);
            expect(response.end).toHaveBeenCalled();
            done();
        });
    });


    afterEach(function () {
        expect(onEndData.indexOf('<li><a href="/" >Home</a></li>') > -1).toBe(true);
        expect(onEndData.indexOf('<li><a href="/error/handler" >Error handling</a></li>') > -1).toBe(true);
        expect(onEndData.indexOf('<li><a href="/guide/tdd" >TDD</a></li>') > -1).toBe(true);
    });


});