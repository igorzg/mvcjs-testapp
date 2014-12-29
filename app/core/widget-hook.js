/**
 * Created by igi on 25/12/14.
 */
var di = require('mvcjs'),
    Type = di.load('typejs'),
    Promise = di.load('promise'),
    error = di.load('error'),
    WidgetHook;

/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name WidgetHook
 *
 * @constructor
 * @description
 * WidgetHook is responsible for serving widget data in templates
 */
WidgetHook = Type.create({
        hooks: Type.ARRAY
    },
    {
        _construct: function MenuWidget_construct() {
            this.hooks = [];
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method WidgetHook#load
         *
         * @description
         * Load widgets
         */
        load: function MenuWidget_load(widget, hookName, widgetMethod) {
            var path = di.normalizePath('@{widgets}/' + widget),
                instance;

            try {
                instance = di.load(path);
                this.hooks.push(
                    {
                        name: hookName,
                        callback: instance[widgetMethod].bind(instance)
                    }
                );
            } catch (e) {
                throw new error.HttpError(500, {
                    widget: widget,
                    hookName: hookName,
                    widgetMethod: widgetMethod
                }, 'Problem with loading hook', e);
            }

        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method WidgetHook#promise
         *
         * @description
         * Create an promise
         */
        promise: function (callback) {
            return new Promise(function (resolve, reject) {
                try {
                    callback(resolve);
                } catch (e) {
                    reject(e);
                }
            });
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method WidgetHook#handle
         *
         * @description
         * Handle hooks
         */
        handle: function MenuWidget_parse(names) {
            var hooks = [];

            this.hooks.slice().forEach(function (item) {
                if (Type.isArray(names)) {
                    if (names.indexOf(item.name) > -1) {
                        hooks.push(this.promise(item.callback));
                    }
                } else {
                    hooks.push(this.promise(item.callback));
                }
            }.bind(this));

            return Promise.all(hooks).then(
                function () {
                    return true;
                }, function (e) {
                    throw new error.HttpError(500, {}, 'Error executing hook', e);
                }
            );
        }
    }
);


module.exports = new WidgetHook;