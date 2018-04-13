import { NavigationBaseFlow } from '../../index';
import { Deferred } from "ts-deferred";
import {DummyPage} from './dummyPage'
import * as _ from "lodash";

export class DummyNavigationFlow extends NavigationBaseFlow<DummyPage> {
    /**
     *
     */
    constructor() {
        // set workflowKey
        super(DummyPage);
    }
    navigateTo(): Promise<any> {
        const d: Deferred<any> = new Deferred<any>();
        d.resolve(this.pageInstance);
        return d.promise;
    }
}
