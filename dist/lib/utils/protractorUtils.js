"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var ts_deferred_1 = require("ts-deferred");
var ProtractorUtils = /** @class */ (function () {
    function ProtractorUtils() {
    }
    ProtractorUtils.any = function (css, obj) {
        var d = new ts_deferred_1.Deferred();
        this.find(css, obj).count()
            .then(function (result) {
            d.resolve(result);
        })
            .then(d.reject);
        return d.promise;
    };
    ProtractorUtils.findFirst = function (css, obj) {
        return this.find(css, obj).get(0);
    };
    ProtractorUtils.findAndClick = function (css, obj) {
        var d = new ts_deferred_1.Deferred();
        this.findFirst(css, obj).click()
            .then(d.resolve)
            .catch(function () {
            d.reject('click failed, el: ' + css);
        });
        return d.promise;
    };
    ProtractorUtils.writeTo = function (elIdentify, text) {
        var d = new ts_deferred_1.Deferred();
        this.find(elIdentify).sendKeys(text)
            .then(d.resolve)
            .catch(function () {
            d.reject('writeTo failed, el: ' + elIdentify);
        });
        return d.promise;
    };
    /**
     * Generic Find elements
     */
    ProtractorUtils.find = function (elIdentify, obj) {
        // check if selector is id or class
        if (elIdentify.indexOf('.') >= 0
            || elIdentify.indexOf(' ') >= 0) {
            // looking for class
            return this.findByCss(elIdentify, obj);
        }
        else {
            return this.findById(elIdentify, obj);
        }
    };
    /**
     * Find elements by id
     */
    ProtractorUtils.findById = function (id, obj) {
        // Define locator
        var locator = protractor_1.by.id(id);
        // Find element and return promise
        return obj ? obj.all(locator) : protractor_1.element.all(locator);
    };
    /**
     * Find elements by css
     */
    ProtractorUtils.findByCss = function (css, obj) {
        // Define locator
        var locator = protractor_1.by.css(css);
        // Find element and return promise
        return obj ? obj.all(locator) : protractor_1.element.all(locator);
    };
    return ProtractorUtils;
}());
exports.ProtractorUtils = ProtractorUtils;
