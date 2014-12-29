/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name widget.js
 * @function
 * @description
 * Is used to extend view so we can support widgets
 */
module.exports = function (componet, di) {

    var viewLoader = componet.get('core/view'),
        error = di.load('error');

    // do widget stuff
    viewLoader.setExtension('widget', function (name) {
        try {
            return di.load('@{widgets}/' + name).render();
        } catch (e) {
            throw new error.HttpError(500, {name: name}, 'Problem with loading widget', e);
        }
    });
    // set tag
    viewLoader.setTag('widget', parse, compile, false, false);
    // parse
    function parse(str, line, parser, types, options) {
        var matched = false;
        parser.on('*', function (token) {
            if (matched) {
                throw new Error('Unexpected token ' + token.match + '.');
            }
            matched = true;
            return true;
        });
        return true;
    }
    // compile
    function compile(compiler, args, content, parents, options, blockName) {
        return '_output += _ext.widget(' + args[0] + ');';
    }
};