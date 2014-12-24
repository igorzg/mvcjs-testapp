var di = require('mvcjs'), // mvcjs as node package
    Type = di.load('typejs'),
    Controller = di.load('core/controller'),
    CoreController;


CoreController = Controller.inherit({
    locals: Type.OBJECT,
    menu: Type.ARRAY
}, {
    _construct: function() {
        this.locals = {};
        this.menu = [];
    },
    beforeEach: function Core_beforeEach() {
        this.locals.pageTitle = 'MVC js';
    },
    action_error: function Core_error(error) {
        // currently

        this.locals = {};
        this.locals.pageTitle = 'Error';
        this.locals.text = 'Error at:'  + JSON.stringify(error);

        return this.renderFile('home/error', this.locals);
    }
});


module.exports = CoreController;


