describe('controllers/core', function () {
    var di,
        Core,
        Type,
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
        di.setAlias('cp', __dirname + '/../../../app/controllers/');
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
    });

    it('construct', function () {
        var api = {};
        var controller = new Core(api);
        expect(controller.locals.scripts.length).toBe(0);
        expect(controller.locals.brand).toBe('MVCJS');
        expect(controller.locals.pageTitle).toBe('Mvcjs nodejs framework');
        expect(controller.locals.pageDesc).toBe('Fast, TDD driven, opinionated lightweight mvc framework for Node.js , a first Node.js framework with dependency injection!');
        expect(controller.menu.length).toBe(0);
    });

    it('beforeEach', function () {
        var api = {};
        widgetHook.handle = function(hooks) {
            expect(hooks.indexOf('menu-hook')).toBe(0);
            return hooks.shift();
        };
        var controller = new Core(api);
        expect(controller.beforeEach()).toBe('menu-hook');
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
                expect(locals.error.indexOf('ERROR') > -1).toBe(true);
                return 'RENDER';
            },
            getParsedUrl: function () {
                return {
                    pathname: 'home/error'
                };
            }
        };
        spyOn(api, 'setStatusCode').and.callThrough();
        spyOn(api, 'renderFile').and.callThrough();
        var controller = new Core({});
        var response = controller.action_error.call(api, {
            exception: {
                code: 500,
                stack: 'ERROR',
                toString: function () {
                    return this.stack;
                }
            }
        });
        expect(api.setStatusCode).toHaveBeenCalled();
        expect(api.renderFile).toHaveBeenCalled();
        expect(response).toBe('RENDER');
    });
});