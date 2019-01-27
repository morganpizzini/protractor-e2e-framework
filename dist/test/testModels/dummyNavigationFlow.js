"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var ts_deferred_1 = require("ts-deferred");
var dummyPage_1 = require("./dummyPage");
var DummyNavigationFlow = /** @class */ (function (_super) {
    __extends(DummyNavigationFlow, _super);
    /**
     *
     */
    function DummyNavigationFlow() {
        // set workflow page
        return _super.call(this, dummyPage_1.DummyPage) || this;
    }
    DummyNavigationFlow.prototype.navigateTo = function () {
        var d = new ts_deferred_1.Deferred();
        d.resolve(this.pageInstance);
        return d.promise;
    };
    return DummyNavigationFlow;
}(index_1.NavigationBaseFlow));
exports.DummyNavigationFlow = DummyNavigationFlow;
