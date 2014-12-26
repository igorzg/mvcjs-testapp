"use strict";
var di = require('mvcjs'),
    Type = di.load('typejs'),
    component = di.load('core/component'),
    mongo = component.get('db/mongo'),
    MenuModel;

/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name MenuModel
 *
 * @constructor
 * @description
 * Menu Model is used for CRUD to menu collection
 */
MenuModel = Type.create({
        model: Type.FUNCTION
    },
    {
        _construct: function() {

            var schema = mongo.schema({
                created: Date,
                title: String,
                link: String,
                alt: String,
                route: String,
                blank: Boolean
            }, {
                collection: 'menu'
            });
            this.model = mongo.model('Menu', schema);
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method MenuModel#import
         *
         * @description
         * Import documents from array
         */
        importData: function(docs) {
            var that = this;
            this.model.collection.drop(function() {
                docs.forEach(function importData(item) {
                    that.save(item.title, item.link, item.alt, item.route, item.blank);
                });
            });
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method MenuModel#find
         *
         * @description
         * Save menu
         */
        findOne: function () {
            return this.model.findOne.apply(this.model, arguments);
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method MenuModel#find
         *
         * @description
         * Save menu
         */
        find: function () {
            return this.model.find.apply(this.model, arguments);
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method MenuModel#save
         *
         * @description
         * Save menu
         */
        save: function(title, link, alt, route, blank) {
            return this.model.create({
                title: title,
                link: link,
                alt: alt,
                route: route,
                blank: blank,
                created: new Date
            });
        }
    }
);


module.exports = new MenuModel;