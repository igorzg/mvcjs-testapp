var di = require('mvcjs'), // mvcjs as node package
    Type = di.load('typejs'),
    Controller = di.load('core/controller'),
    widgetHooks = di.load('@{core}/widget-hook'),
    CoreController;

// load widget menu, as menu-hook alias and for menu-hook alias use hook method
widgetHooks.load('menu', 'menu-hook', 'hook');

CoreController = Controller.inherit({
    locals: Type.OBJECT,
    menu: Type.ARRAY
}, {
    _construct: function() {
        this.locals = {
            scripts: []
        };
        this.menu = [];
    },
    beforeEach: function Core_beforeEach() {
        this.locals.pageTitle = 'MVC js';
        this.locals.title = 'MVCJS';
        // handle hooks
        return widgetHooks.handle(['menu-hook']); // run menu alias
    },

    action_error: function Core_error(error) {
        // currently
        this.locals.pageTitle = 'Error';
        this.locals.text = 'Error at:'  + error;

        return this.renderFile('home/error', this.locals);
    }
});


module.exports = CoreController;


