"use strict";
var di = require('mvcjs'),
    Type = di.load('typejs'),
    component = di.load('core/component'),
    mongo = component.get('db/mongo'),
    ContentModel;

/**
 * @license Mit Licence 2014
 * @since 0.0.1
 * @author Igor Ivanovic
 * @name ContentModel
 *
 * @constructor
 * @description
 * Content Model is used for CRUD to content collection
 */
ContentModel = Type.create({
        model: Type.FUNCTION
    },
    {
        _construct: function() {

            var schema = mongo.schema({
                created: Date,
                text: String,
                pageTitle: String,
                pageDesc: String,
                url: String
            }, {
                collection: 'content'
            });
            this.model = mongo.model('Content', schema);
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method ContentModel#import
         *
         * @description
         * Import documents from array
         */
        importData: function(docs) {
            var that = this;
            this.model.collection.drop(function() {
                docs.forEach(function importData(item) {
                    that.save(item.text, item.url, item.pageTitle, item.pageDesc);
                });
            });
        },
        /**
         * @since 0.0.1
         * @author Igor Ivanovic
         * @method ContentModel#find
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
         * @method ContentModel#find
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
         * @method ContentModel#save
         *
         * @description
         * Save menu
         */
        save: function(text, url, pageTitle, pageDesc) {
            return this.model.create({
                text: text,
                url: url,
                pageTitle: pageTitle,
                pageDesc: pageDesc,
                created: new Date
            });
        }
    }
);


module.exports = new ContentModel;