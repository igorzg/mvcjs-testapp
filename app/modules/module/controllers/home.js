var di = require('mvcjs'), // mvcjs as node package
    CoreController = di.load('@{controllersPath}/core'),
    Promise = di.load('promise'),
    TestController;
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
TestController = CoreController.inherit({}, {

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method HomeController#action_index
     *
     * @description
     * Index action request
     * @return {*|string}
     */
    action_index: function HomeController_action_index() {

        this.locals.scripts.push({
            src: 'https://buttons.github.io/buttons.js',
            id: 'github-bjs',
            async: true
        });
        return this.renderFile('test/index', this.locals);
    }
});


module.exports = TestController;