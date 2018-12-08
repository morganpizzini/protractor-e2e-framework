"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_deferred_1 = require("ts-deferred");
var protractorUtils_1 = require("../utils/protractorUtils");
var entityIdentifyMethod;
(function (entityIdentifyMethod) {
    entityIdentifyMethod[entityIdentifyMethod["title"] = 0] = "title";
    entityIdentifyMethod[entityIdentifyMethod["class"] = 1] = "class";
    entityIdentifyMethod[entityIdentifyMethod["id"] = 2] = "id";
})(entityIdentifyMethod = exports.entityIdentifyMethod || (exports.entityIdentifyMethod = {}));
var BaseModal = /** @class */ (function () {
    /**
     *
     */
    function BaseModal(identifyValue, identifyMethod) {
        if (identifyMethod === void 0) { identifyMethod = entityIdentifyMethod.title; }
        this.identifyValue = '';
        this.modalTitleId = '.modal-title';
        this.modalCloseId = '.modal-content .close';
        this.identifyValue = identifyValue;
        // set modal identifier method
        switch (identifyMethod) {
            case entityIdentifyMethod.title:
                this.isShowIdentifyMethod = this.isShowByTitle;
                break;
            case entityIdentifyMethod.class:
            case entityIdentifyMethod.id:
                this.isShowIdentifyMethod = this.isShowByFind;
                break;
            default:
                break;
        }
    }
    // is visible
    BaseModal.prototype.isShown = function () {
        return this.isShowIdentifyMethod();
    };
    BaseModal.prototype.isShowByTitle = function () {
        var d = new ts_deferred_1.Deferred();
        var self = this;
        protractorUtils_1.ProtractorUtils.findFirst(this.modalTitleId).getText().then(function (txt) {
            d.resolve(txt === self.identifyValue);
        })
            .catch(d.reject);
        return d.promise;
    };
    BaseModal.prototype.isShowByFind = function () {
        var d = new ts_deferred_1.Deferred();
        var self = this;
        protractorUtils_1.ProtractorUtils.any(this.modalTitleId).then(function (count) {
            d.resolve(count > 0);
        })
            .catch(d.reject);
        return d.promise;
    };
    // is not visible
    BaseModal.prototype.isHidden = function () {
        return this.isShown().then(function (res) { return !res; });
    };
    // close
    BaseModal.prototype.close = function () {
        var _this = this;
        var d = new ts_deferred_1.Deferred();
        this.isShown().then(function (res) {
            if (res) {
                // close modal
                protractorUtils_1.ProtractorUtils.findAndClick(_this.modalCloseId)
                    .then(d.resolve)
                    .catch(d.reject);
            }
            else {
                // modal is already closed
                d.resolve();
            }
        })
            .catch(d.reject);
        return d.promise;
    };
    return BaseModal;
}());
exports.BaseModal = BaseModal;
