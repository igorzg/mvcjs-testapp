/**
 * Created by igi on 25/12/14.
 */

module.exports = function (componet, di) {

    var router = componet.get('core/router');

    router.add([
        {
            pattern: 'home/<action>',
            route: 'home/<action>'
        },
        {
            dynamic: true,
            constructor: di.load('@{envPath}/dynamic-router')
        }
    ]);

    router.add({
        pattern: '/',
        route: 'home/index'
    });

};