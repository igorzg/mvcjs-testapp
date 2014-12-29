var di = require('mvcjs'), // mvcjs as node package
    CoreController = di.load('@{controllersPath}/core'),
    contentModel = di.load('@{modelsPath}/content'),
    core = di.load('core'),
    Promise = di.load('promise'),
    HomeController;


HomeController = CoreController.inherit({}, {
    /**
     * action index
     * @param params
     * @param data
     * @returns {*|string}
     * @constructor
     */
    action_index: function Core_create(params, data) {
        this.locals.scripts.push({
            src: 'https://buttons.github.io/buttons.js',
            id: 'github-bjs',
            async: true,
            defer: true
        });
        return this.renderFile('home/index', this.locals);
    },

    /**
     * Before each action
     * @returns {*}
     */
    beforeEach: function () {
        var _super = this._super();
        this.locals.scripts.push({
            src: '/assets/js/prism.js'
        });
        return _super;
    },
    /**
     * Action logger
     * @param params
     * @param data
     * @returns {*|string}
     * @constructor
     */
    action_logger: function HomeController_content(params, data) {
        return this.renderFile('home/logger', this.locals);
    },
    /**
     * Before content
     * @param params
     * @param data
     * @returns {Promise}
     */
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
    /**
     * Action content
     * @param params
     * @param data
     * @returns {*|string}
     * @constructor
     */
    action_content: function HomeController_content(params, data) {
        if (data && data.text) {
            this.locals.content = data.text;
        }
        return this.renderFile('home/content', this.locals);
    }
});


module.exports = HomeController;