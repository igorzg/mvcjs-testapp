var di = require('mvcjs'), // mvcjs as node package
    CoreController = di.load('@{controllersPath}/core'),
    Promise = di.load('promise'),
    core = di.load('core'),
    PostController;



PostController = CoreController.inherit({}, {
    before_create: function Posts_beforecreate(params) {
        // example model call
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                params.title = 'THIS IS AN MODEL CALL EXAMPLE';
                resolve(params);
            }, 0);
        });
    },
    action_create: function Core_create(params, data) {
        // currently


        return this.renderFile('posts/index', this.locals);
    }
});


module.exports = PostController;