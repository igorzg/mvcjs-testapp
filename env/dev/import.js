/**
 * Created by igi on 25/12/14.
 */

module.exports = function (componet, di) {

    // import menu at bootstrap
    var menuModel = di.load('@{modelsPath}/menu');
    var menu = JSON.parse(di.readFileSync('@{envPath}/imports/menu.json'));
    menuModel.importData(menu);


};