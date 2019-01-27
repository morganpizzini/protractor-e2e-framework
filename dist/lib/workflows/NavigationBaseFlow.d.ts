import { INavigationFlow } from './INavigationFlow';
import { BasePage } from '../entities/page.po';
export interface NoParamConstructor<T> {
    new (): T;
}
export declare abstract class NavigationBaseFlow<T extends BasePage> implements INavigationFlow {
    pageInstance?: T;
    protected fromNavigationFlow: INavigationFlow;
    /**
     * NavigationFlowBase constructor
     */
    constructor(ctor?: NoParamConstructor<T>);
    /**
     * navigate out from page
     * every navigationflow know which actions to do for navigate to his self page
     */
    abstract navigateTo(): Promise<T>;
}
