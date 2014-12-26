/**
 * Created by igi on 06/11/14.
 */

module.exports = function (componet, di) {
    "use strict";
    var viewLoader,
        logger = componet.get('core/logger'),
        loggerModel = di.load('@{modelsPath}/logger');

    // attach core path
    di.setAlias('core', '@{appPath}/core');
    // set widgets path
    di.setAlias('widgets', '@{viewsPath}/widgets');

    // set theme for view loader
    viewLoader = componet.get('core/view');
    viewLoader.setTheme('default');
    // bind logger hook
    logger.addHook(loggerModel.save.bind(loggerModel));


    di.load('@{envPath}/widget')(componet, di);
    di.load('@{envPath}/router')(componet, di);
    di.load('@{envPath}/import')(componet, di);
};