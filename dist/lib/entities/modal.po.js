"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_deferred_1 = require("ts-deferred");
var protractorUtils_1 = require("../utils/protractorUtils");
var BaseModal = /** @class */ (function () {
    /**
     *
     */
    function BaseModal(modalTitle) {
        this.modalTitle = '';
        this.modalTitleId = '.modal-title';
        this.modalCloseId = '.modal-content .close';
        this.modalTitle = modalTitle;
    }
    // is visible
    BaseModal.prototype.isShown = function () {
        var d = new ts_deferred_1.Deferred();
        var self = this;
        protractorUtils_1.ProtractorUtils.findFirst(this.modalTitleId).getText().then(function (txt) {
            d.resolve(txt === self.modalTitle);
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
