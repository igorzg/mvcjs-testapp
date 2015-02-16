/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name import.js
 * @function
 * @description
 * Is used to do imports in system by framework on bootstrap
 */
module.exports = function (componet, di) {

    // import menu at bootstrap
    var menuModel = di.load('@{modelsPath}/menu'),
        contentModel = di.load('@{modelsPath}/content');

    var menu = JSON.parse(di.readFileSync('@{envPath}/imports/menu.json'));
    menuModel.importData(menu);

    var content = JSON.parse(di.readFileSync('@{envPath}/imports/content.json'));
    contentModel.importData(content);

    /*
    var util = require('util');
    var article = util.inspect(di.readFileSync('@{basePath}/coverage/article.html'));
    article = article.replace(/\\\'/g, "'");
    article = article.replace(/"/g, '\\"');
    console.log(article);
    //*/
};