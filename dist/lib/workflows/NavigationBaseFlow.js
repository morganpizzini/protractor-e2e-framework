"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameworkConfiguration_1 = require("../config/frameworkConfiguration");
var NavigationBaseFlow = /** @class */ (function () {
    /**
     * NavigationFlowBase constructor
     */
    // constructor(fromNavigationFlow?: INavigationFlow) {
    function NavigationBaseFlow(ctor) {
        // public pageInstance: T= new () => T;
        // from page navigation flow
        // protected basePage: any = null;
        this.fromNavigationFlow = {};
        if (ctor === undefined) {
            this.pageInstance = undefined;
            return;
        }
        this.pageInstance = new ctor();
        var fromWorkflowKey = frameworkConfiguration_1.FrameworkConfiguration.resolvePreviousFlowKey(this.pageInstance.getPageId());
        if (!fromWorkflowKey)
            //there's no navigation flow dependencies
            return;
        // set previous navigation flow dependencies
        this.fromNavigationFlow = frameworkConfiguration_1.FrameworkConfiguration.resolveType(fromWorkflowKey);
        // if (fromNavigationFlow) {
        //     // this.basePage = basePage;
        //     this.fromNavigationFlow = fromNavigationFlow; // .getNavigationFlow();
        // } else {
        //     // should load base url
        // }
    }
    return NavigationBaseFlow;
}());
exports.NavigationBaseFlow = NavigationBaseFlow;
