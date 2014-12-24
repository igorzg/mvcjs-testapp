/**
 * Created by igi on 06/11/14.
 */

module.exports = function (componet, di) {
    "use strict";
    var viewLoader,
        router,
        logger = componet.get('core/logger'),
        loggerModel = di.load('@{modelsPath}/logger');

    viewLoader = componet.get('core/view');
    viewLoader.setTheme('default');

    // bind logger hook
    logger.addHook(loggerModel.save.bind(loggerModel));

    router = componet.get('core/router');
    router.add([
        {
            pattern: 'home/<action>',
            route: 'home/<action>'
        },
        {
            pattern: 'posts/<action:(create|update|delete)>',
            route: 'posts/<action>',
            method: ['GET', 'POST']
        }
    ]);

    router.add({
        pattern: '/',
        route: 'home/index'
    });
};