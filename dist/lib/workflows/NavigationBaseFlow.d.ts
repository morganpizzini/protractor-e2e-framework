import { INavigationFlow } from './InavigationFlow';
export declare abstract class NavigationBaseFlow implements INavigationFlow {
    protected fromNavigationFlow: INavigationFlow;
    /**
     * NavigationFlowBase constructor
     */
    constructor(fromNavigationFlow?: INavigationFlow);
    /**
     * navigate out from page
     * every navigationflow know which actions to do for navigate to his self page
     */
    abstract navigateTo(): Promise<any>;
}
