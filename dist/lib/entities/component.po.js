"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractorUtils_1 = require("../utils/protractorUtils");
var ts_deferred_1 = require("ts-deferred");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(elementId) {
        this.elementId = '';
        this.elementId = elementId;
    }
    BaseComponent.prototype.getElement = function () {
        return protractorUtils_1.ProtractorUtils.findFirst(this.elementId);
    };
    BaseComponent.prototype.IsShown = function () {
        var d = new ts_deferred_1.Deferred();
        protractorUtils_1.ProtractorUtils.any(this.elementId)
            .then(function (count) {
            d.resolve(count > 0);
        })
            .catch(d.reject);
        return d.promise;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
