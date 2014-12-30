var di = require('mvcjs'), // mvcjs as node package
    Type = di.load('typejs'),
    Controller = di.load('core/controller'),
    widgetHooks = di.load('@{core}/widget-hook'),
    CoreController;

// load widget menu, as menu-hook alias and for menu-hook alias use hook method
widgetHooks.load('menu', 'menu-hook', 'hook');
/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name CoreController
 *
 * @constructor
 * @description
 * Core controller , most controllers are inherited from core controller
 */
CoreController = Controller.inherit({
    locals: Type.OBJECT,
    menu: Type.ARRAY
}, {
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method CoreController#_construct
     *
     * @description
     * On construct set some defaults
     */
    _construct: function() {
        this.locals = {
            scripts: [],
            brand: 'MVCJS',
            pageTitle: 'Mvcjs nodejs framework',
            pageDesc: 'Mvcjs fast, opinionated lightweight mvc framework for Node.js inspired by Yii framework'
        };
        this.menu = [];
    },
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method CoreController#beforeEach
     *
     * @description
     * This is executed before each action
     * @return {object} Promise
     */
    beforeEach: function Core_beforeEach() {
        // handle hooks
        return widgetHooks.handle(['menu-hook']); // run menu alias
    },
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method CoreController#action_error
     *
     * @description
     * Error handler for application
     * @return {*|string}
     */
    action_error: function Core_error(error) {
        // currently
        this.locals.pageTitle = 'Error - mvcjs nodejs framework';
        this.locals.text = error.toString().replace(/\\n/g, '\n');

        this.setStatusCode(error.code);

        return this.renderFile('home/error', this.locals);
    }
});


module.exports = CoreController;


