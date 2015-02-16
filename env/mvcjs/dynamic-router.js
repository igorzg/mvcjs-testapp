var di = require('mvcjs'),
    RouteRuleInterface = di.load('interface/routeRule'),
    menuModel = di.load('@{modelsPath}/menu'),
    Promise = di.load('promise'),
    MenuRoute;

/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name MenuRoute
 * @constructor
 * @description
 * Menu route is used by mvcjs to handle dynamic routing
 */
MenuRoute = RouteRuleInterface.inherit({}, {
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method MenuRoute#parseRequest
     *
     * @description
     * Parse current request, if is found is db and there is route filled then return route
     * otherwise return false
     * @return {object} Promise
     */
    parseRequest: function(method, route) {
        return new Promise(function (resolve, reject) {
            menuModel.findOne({link: route.pathname}, function(err, data) {
                if (!!data && !!data.route) {
                    resolve([data.route, route.query]);
                }else {
                    resolve(false);
                }
            });
        });
    },
    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method MenuRoute#createUrl
     *
     * @description
     * Create dynamic url
     * @return {string|boolean}
     */
    createUrl: function(route, params) {
        if (route === 'home/content') { // match route
            if (params.link) {
                return params.link; // return custom link from params
            }
        }
        return false;
    }
});


module.exports = MenuRoute;






