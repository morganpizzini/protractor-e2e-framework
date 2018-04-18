"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO implement some 'isLoggedIn' state
var NavigationBaseFlow = /** @class */ (function () {
    /**
     * NavigationFlowBase constructor
     */
    function NavigationBaseFlow(fromNavigationFlow) {
        // from page navigation flow
        // protected basePage: any = null;
        this.fromNavigationFlow = {};
        if (fromNavigationFlow) {
            // this.basePage = basePage;
            this.fromNavigationFlow = fromNavigationFlow; // .getNavigationFlow();
        }
        else {
            // should load base url
        }
    }
    return NavigationBaseFlow;
}());
exports.NavigationBaseFlow = NavigationBaseFlow;
