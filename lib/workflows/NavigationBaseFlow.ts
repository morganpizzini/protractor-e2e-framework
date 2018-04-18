import { INavigationFlow } from './INavigationFlow';
import { FrameworkConfiguration } from '../config/frameworkConfiguration';
import { BasePage } from '../entities/page.po';
// TODO implement some 'isLoggedIn' state

export interface NoParamConstructor<T> {
    new(): T;
}

export abstract class NavigationBaseFlow<T extends BasePage> implements INavigationFlow{
    pageInstance: T;
    // public pageInstance: T= new () => T;
    // from page navigation flow
    // protected basePage: any = null;
    protected fromNavigationFlow: INavigationFlow = {} as any;
    /**
     * NavigationFlowBase constructor
     */
    // constructor(fromNavigationFlow?: INavigationFlow) {
    constructor(ctor: NoParamConstructor<T>) {
        this.pageInstance = new ctor();
        const fromWorkflowKey = FrameworkConfiguration.resolvePreviousFlowKey(this.pageInstance.getPageId());
        if (!fromWorkflowKey)
            //there's no navigation flow dependencies
            return;
        
        // set previous navigation flow dependencies
        this.fromNavigationFlow = FrameworkConfiguration.resolveType(fromWorkflowKey);
        // if (fromNavigationFlow) {
        //     // this.basePage = basePage;
        //     this.fromNavigationFlow = fromNavigationFlow; // .getNavigationFlow();
        // } else {
        //     // should load base url
        // }
    }
    /**
     * navigate out from page
     * every navigationflow know which actions to do for navigate to his self page
     */
    abstract navigateTo(): Promise<T>;
}
