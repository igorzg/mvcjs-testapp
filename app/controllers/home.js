var di = require('mvcjs'), // mvcjs as node package
    CoreController = di.load('@{controllersPath}/core'),
    contentModel = di.load('@{modelsPath}/content'),
    Promise = di.load('promise'),
    HomeController;
/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name HomeController
 *
 * @constructor
 * @description
 * Home controller is responsible for home actions
 */
HomeController = CoreController.inherit({}, {
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method HomeController#action_index
     *
     * @description
     * Index action request
     * @return {*|string}
     */
    action_index: function HomeController_action_index(params, data) {
        var packageJson = JSON.parse(di.readFileSync('@{basePath}/package.json'));
        this.locals.scripts.push({
            src: 'https://buttons.github.io/buttons.js',
            id: 'github-bjs',
            async: true
        });
        if (packageJson && packageJson.dependencies && packageJson.dependencies.mvcjs) {
            this.locals.version = packageJson.dependencies.mvcjs;
        }

        return this.renderFile('home/index', this.locals);
    },

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method HomeController#beforeEach
     *
     * @description
     * This is executed before each action
     * @return {object} Promise
     */
    beforeEach: function HomeController_beforeEach() {
        var _parentBeforeEachPromise = this._super();
        this.locals.scripts.push({
            src: '/assets/js/prism.js'
        });
        return _parentBeforeEachPromise;
    },
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method HomeController#before_content
     *
     * @description
     * Before content action do some data handling
     * @return {object} Promise
     */
    before_content: function HomeController_before_content(params, data) {
        var pathName = this.getParsedUrl().pathname;
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
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method HomeController#action_content
     *
     * @description
     * Content action is responsible for displaying dynamic content
     * @return {*|string}
     */
    action_content: function HomeController_content(params, data) {
        if (data) {
            if (data.text) {
                this.locals.content = data.text;
            }
            if (data.pageTitle) {
                this.locals.pageTitle = data.pageTitle;
            }
            if (data.pageDesc) {
                this.locals.pageDesc = data.pageDesc;
            }
        }
        return this.renderFile('home/content', this.locals);
    }
});


module.exports = HomeController;