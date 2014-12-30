describe('controllers/home', function () {
    var di,
        Core,
        Home,
        Type,
        contentModel = {
            findOne: function() {

            }
        },
        widgetHooks = [],
        widgetHook = {
            load: function (a, b, c) {
                widgetHooks.push({
                    name: a,
                    alias: b,
                    method: c
                });
            },
            handle: function () {
            }
        };
    beforeEach(function () {
        di = require('mvcjs');
        di.setAlias('cp', __dirname + '/../../app/controllers/');
        Type = di.load('typejs');
        Core = di.mock('@{cp}/core', {
            'typejs': Type,
            'core/controller': {
                inherit: function () {
                    return Type.create.apply(Type, arguments);
                }
            },
            '@{core}/widget-hook': widgetHook
        });
        Home = di.mock('@{cp}/home', {
            'typejs': Type,
            'promise': di.load('promise'),
            '@{controllersPath}/core': Core,
            '@{modelsPath}/content': contentModel
        });
    });

    it('construct', function () {
        var api = {};
        var controller = new Home(api);
        expect(controller.locals.scripts.length).toBe(0);
        expect(controller.locals.brand).toBe('MVCJS');
        expect(controller.locals.pageTitle).toBe('Mvcjs nodejs framework');
        expect(controller.locals.pageDesc).toBe('Mvcjs fast, opinionated lightweight mvc framework for Node.js inspired by Yii framework');
        expect(controller.menu.length).toBe(0);
    });


    it('action_index', function () {
        var api = {
            locals: {
                scripts: []
            },
            renderFile: function(route, locals) {
                return 'RENDERED';
            }
        };
        spyOn(api, 'renderFile').and.callThrough();
        di.setAlias('basePath', __dirname + '/../../');
        var controller = new Home(api);
        var result = controller.action_index.call(api);

        expect(api.renderFile).toHaveBeenCalledWith( 'home/index', {
            scripts : [ {
                src : 'https://buttons.github.io/buttons.js',
                id : 'github-bjs',
                async : true
            } ],
            version : '0.1.0-beta-15'
        });
        expect(result).toBe('RENDERED');
        expect(api.locals.scripts.length).toBe(1);
    });


    it('action_content', function () {
        var api = {
            locals: {
                content: '',
                pageTitle: '',
                pageDesc: ''
            },
            renderFile: function(route, locals) {
                return 'RENDERED';
            }
        };
        spyOn(api, 'renderFile').and.callThrough();
        di.setAlias('basePath', __dirname + '/../../');
        var controller = new Home(api);
        var result = controller.action_content.call(api, {}, {
            text: 'TEXT',
            pageTitle: 'TITLE',
            pageDesc: 'DESC'
        });
        expect(api.renderFile).toHaveBeenCalledWith( 'home/content', {
            pageTitle: 'TITLE',
            pageDesc: 'DESC',
            content : 'TEXT'
        });
        expect(result).toBe('RENDERED');
    });

    it('before_content', function (done) {
        var api = {
            getParsedUrl: function(route, locals) {
                return {
                    pathname: '/home/index'
                };
            }
        };
        contentModel.findOne = function(data, callback) {
            expect(data.url).toBe('/home/index');
            callback(null, {
                id: 1,
                text: 'yes'
            });
        };

        spyOn(api, 'getParsedUrl').and.callThrough();
        spyOn(contentModel, 'findOne').and.callThrough();

        di.setAlias('basePath', __dirname + '/../../');
        var controller = new Home(api);
        var result = controller.before_content.call(api);


        result.then(function(data) {
            expect(api.getParsedUrl).toHaveBeenCalled();
            expect(contentModel.findOne).toHaveBeenCalled();
            expect(data.id).toBe(1);
            expect(data.text).toBe('yes');
            done();
        });
    });


    it('before_content error', function (done) {
        var api = {
            getParsedUrl: function(route, locals) {
                return {
                    pathname: '/home/index'
                };
            }
        };
        contentModel.findOne = function(data, callback) {
            expect(data.url).toBe('/home/index');
            callback(true, {
                id: 1,
                text: 'yes'
            });
        };

        spyOn(api, 'getParsedUrl').and.callThrough();
        spyOn(contentModel, 'findOne').and.callThrough();

        di.setAlias('basePath', __dirname + '/../../');
        var controller = new Home(api);
        var result = controller.before_content.call(api);

        result.then(null, function(error) {
            console.log('error', error);
            done();
        });
    });

    it('beforeEach', function () {
        var api = {};
        widgetHook.handle = function(hooks) {
            expect(hooks.indexOf('menu-hook')).toBe(0);
            return hooks.shift();
        };
        var controller = new Home(api);
        expect(controller.beforeEach()).toBe('menu-hook');
        expect(controller.locals.scripts.length).toBe(1);
    });

    it('action_error', function () {
        var api = {
            locals: {},
            setStatusCode: function(code) {
                expect(code).toBe(500);
            },
            renderFile: function(name, locals) {
                expect(name).toBe('home/error');
                expect(locals.pageTitle).toBe('Error - mvcjs nodejs framework');
                expect(locals.text).toBe('ERROR');
                return 'RENDER';
            }
        };
        spyOn(api, 'setStatusCode').and.callThrough();
        spyOn(api, 'renderFile').and.callThrough();
        var controller = new Home({});
        var response = controller.action_error.call(api, {
            code: 500,
            toString: function() {
                return "ERROR";
            }
        });
        expect(api.setStatusCode).toHaveBeenCalled();
        expect(api.renderFile).toHaveBeenCalled();
        expect(response).toBe('RENDER');
    });
});