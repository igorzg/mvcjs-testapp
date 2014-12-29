var di = require('mvcjs'),
    RouteRuleInterface = di.load('interface/routeRule'),
    menuModel = di.load('@{modelsPath}/menu'),
    Promise = di.load('promise'),
    MenuRoute;


MenuRoute = RouteRuleInterface.inherit({}, {
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
    createUrl: function(route, params) {

    }
});


module.exports = MenuRoute;






