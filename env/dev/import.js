/**
 * Created by igi on 25/12/14.
 */

module.exports = function (componet, di) {

    // import menu at bootstrap
    var menuModel = di.load('@{modelsPath}/menu'),
        contentModel = di.load('@{modelsPath}/content');

    var menu = JSON.parse(di.readFileSync('@{envPath}/imports/menu.json'));
    menuModel.importData(menu);

    var content = JSON.parse(di.readFileSync('@{envPath}/imports/content.json'));
    contentModel.importData(content);


    //var util = require('util');
    //var article = util.inspect(di.readFileSync('@{basePath}/coverage/article.html'));
    //console.log(article);
};