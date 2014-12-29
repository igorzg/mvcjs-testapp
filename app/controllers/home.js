var di = require('mvcjs'), // mvcjs as node package
    CoreController = di.load('@{controllersPath}/core'),
    contentModel = di.load('@{modelsPath}/content'),
    core = di.load('core'),
    Promise = di.load('promise'),
    HomeController;


HomeController = CoreController.inherit({}, {
    action_index: function Core_create(params, data) {
        return this.renderFile('home/index', this.locals);
    },

    before_content: function (params, data) {
        var pathName = this._request.parsedUrl.pathname;
        return new Promise(function(resolve, reject) {
            contentModel.findOne({url: pathName}, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            });
        });
    },
    action_content: function HomeController_content(params, data) {
        this.locals.scripts.push({
            src: '/assets/js/prism.js'
        });
        this.locals.content = data.text;
        return this.renderFile('home/content', this.locals);
    }
});


module.exports = HomeController;