/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name router.js
 * @function
 * @description
 * Is used to do route configuration at bootstrap
 */
module.exports = function (componet, di) {

    var router = componet.get('core/router');

    router.add([
        {
            pattern: 'home/<action>',
            route: 'home/<action>'
        },
        {
            pattern: 'module/<controller>/<action>',
            route: 'module/<controller>/<action>'
        },
        {
            dynamic: true,
            constructor: di.load('@{envPath}/dynamic-router')
        }
    ]);

    router.add({
        pattern: '/',
        route: 'home/index',
        method: ['GET', 'POST']
    });

};