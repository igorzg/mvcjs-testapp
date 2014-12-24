var di = require('mvcjs'), // mvcjs as node package
    CoreController = di.load('@{controllersPath}/core'),
    core = di.load('core'),
    Promise = di.load('promise'),
    HomeController;



HomeController = CoreController.inherit({}, {
    action_index: function Core_create(params, data) {
        // currently
        core.extend(this.locals, params);
        core.extend(this.locals, data);

        this.locals.params = JSON.stringify(params);

        this.locals.text = 'THIS IS AN EXAMPLE text';

        this.menu.push(this.createUrl('posts/create', {id: 100, title: 'Dynamic encoded title """@@@[]a'}));
        this.menu.push(this.createUrl('home/test'));
        this.menu.push(this.createUrl('home/index'));

        this.locals.menu = this.menu;

        return this.renderFile('home/index', this.locals);
    }
});


module.exports = HomeController;