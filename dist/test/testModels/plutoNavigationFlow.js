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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var ts_deferred_1 = require("ts-deferred");
var plutoPage_1 = require("./plutoPage");
var _ = __importStar(require("lodash"));
var PlutoNavigationFlow = /** @class */ (function (_super) {
    __extends(PlutoNavigationFlow, _super);
    /**
     *
     */
    function PlutoNavigationFlow() {
        // set workflow page
        return _super.call(this, plutoPage_1.PlutoPage) || this;
    }
    PlutoNavigationFlow.prototype.navigateTo = function () {
        var _this = this;
        var d = new ts_deferred_1.Deferred();
        //argument validation
        if (_.isEmpty(this.fromNavigationFlow)) {
            d.resolve(this.pageInstance);
            return d.promise;
        }
        this.fromNavigationFlow.navigateTo().then(function (previousPage) {
            d.resolve(_this.pageInstance);
        });
        return d.promise;
    };
    return PlutoNavigationFlow;
}(index_1.NavigationBaseFlow));
exports.PlutoNavigationFlow = PlutoNavigationFlow;
