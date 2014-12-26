var di = require('mvcjs'), // mvcjs as node package
    CoreController = di.load('@{controllersPath}/core'),
    core = di.load('core'),
    Promise = di.load('promise'),
    HomeController;



HomeController = CoreController.inherit({}, {
    action_index: function Core_create(params, data) {
        return this.renderFile('home/index', this.locals);
    }
});


module.exports = HomeController;