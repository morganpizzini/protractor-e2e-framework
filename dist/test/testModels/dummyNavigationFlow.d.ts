import { NavigationBaseFlow } from '../../index';
import { DummyPage } from './dummyPage';
export declare class DummyNavigationFlow extends NavigationBaseFlow<DummyPage> {
    /**
     *
     */
    constructor();
    navigateTo(): Promise<any>;
}
