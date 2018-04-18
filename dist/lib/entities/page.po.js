"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var ts_deferred_1 = require("ts-deferred");
var frameworkConfiguration_1 = require("../config/frameworkConfiguration");
var BasePage = /** @class */ (function () {
    function BasePage(pageId) {
        this.pageId = '';
        this.pageBaseUrl = '';
        this.pageId = pageId;
        this.pageBaseUrl = frameworkConfiguration_1.FrameworkConfiguration.browserData.urls[this.pageId];
    }
    BasePage.prototype.goToPageUrl = function () {
        var d = new ts_deferred_1.Deferred();
        var self = this;
        this.isAt().then(function (res) {
            return !res ?
                // TODO config - workflow logic or direct url navigation
                self.getCurrentNavigationPattern().then(function () {
                    d.resolve();
                }) :
                d.resolve();
        });
        return d.promise;
    };
    BasePage.prototype.isAt = function () {
        var _this = this;
        var d = new ts_deferred_1.Deferred();
        protractor_1.browser.getCurrentUrl()
            .then(function (currentUrl) {
            d.resolve(currentUrl === _this.pageBaseUrl);
        })
            .catch(function (e) {
            d.resolve(false);
        });
        return d.promise;
    };
    // #region private methods
    BasePage.prototype.getCurrentNavigationPattern = function () {
        if (frameworkConfiguration_1.FrameworkConfiguration.workflowNavigationEnabled) {
            // some kind of navigation by workflows
            try {
                return frameworkConfiguration_1.FrameworkConfiguration.resolveFlow(this.pageId).navigateTo();
            }
            catch (error) {
                var d = new ts_deferred_1.Deferred();
                d.reject(error);
                return d.promise;
            }
        }
        else {
            return this.goTo();
        }
    };
    BasePage.prototype.goTo = function () {
        var d = new ts_deferred_1.Deferred();
        var navigationUrl = this.pageBaseUrl;
        // /patient-visit-doctor/Patient-001/Visit-001
        if (navigationUrl.indexOf('(') >= 0) {
            // base url is regex
            navigationUrl = this.composeUrl(navigationUrl);
        }
        protractor_1.browser.get(navigationUrl).then(function () {
            d.resolve();
        });
        return d.promise;
    };
    BasePage.prototype.composeUrl = function (baseUrl) {
        var strings = baseUrl.split('/');
        var rewriteUrlArr = [];
        for (var i = 0; i < strings.length; i++) {
            var singleBlock = strings[i];
            if (singleBlock.indexOf('(') >= 0) {
                var urlProp = singleBlock.replace(/ *-\([^)]*\) */g, '');
                rewriteUrlArr.push(singleBlock.replace(/ *\([^)]*\) */g, frameworkConfiguration_1.FrameworkConfiguration.browserData.paramethers[urlProp]));
            }
            else {
                rewriteUrlArr.push(singleBlock);
            }
        }
        return rewriteUrlArr.join('/');
    };
    return BasePage;
}());
exports.BasePage = BasePage;
