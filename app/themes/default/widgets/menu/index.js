/**
 * Created by igi on 25/12/14.
 */
var di = require('mvcjs'),
    Type = di.load('typejs'),
    modelMenu = di.load('@{modelsPath}/menu'),
    component = di.load('core/component'),
    error = di.load('error'),
    view = component.get('core/view'),
    logger = component.get('core/logger'),
    MenuWidget;

/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name MenuWidget
 *
 * @constructor
 * @description
 * Menu widget is responsible to handle data
 */
MenuWidget = Type.create({
        model: Type.OBJECT,
        locals: Type.OBJECT
    },
    {
        _construct: function MenuWidget_construct() {
            this.model = modelMenu;
            this.locals = {};
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method MenuWidget#hook
         *
         * @description
         * Hook data to the menu widget
         * Fire this before template compiling
         */
        hook: function MenuWidget_hook(resolve) {
            this.model.find(function(e, data) {
                logger.print('MenuWidget.hook', data, e);
                if (!!e) {
                    throw new error.HttpError(500, {data: data}, 'Problem with resolving menu widget data', e);
                }
                this.locals.menu = data;
                resolve(data);
            }.bind(this));
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method MenuWidget#render
         *
         * @description
         * This is fired by view extension
         * It will render what ever you return here
         */
        render: function MenuWidget_render() {
            var template = view.renderFile('widgets/menu/view', this.locals);
            logger.print('MenuWidget.parse', template, this.locals);
            return template;
        }
    }
);


module.exports = new MenuWidget;