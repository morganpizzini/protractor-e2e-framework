import { NavigationBaseFlow } from '../../index';
import { Deferred } from "ts-deferred";
import { DummyPage } from './dummyPage';
import { PippoPage } from './pippoPage';
import * as _ from "lodash";

export class PippoNavigationFlow extends NavigationBaseFlow<PippoPage> {
    /**
     *
     */
    constructor() {
        // set workflowKey
        super(PippoPage);
    }
    navigateTo(): Promise<any> {
        const d: Deferred<any> = new Deferred<any>();
        //argument validation
        if (_.isEmpty(this.fromNavigationFlow)) {
            d.resolve(this.pageInstance);
            return d.promise;
        } 
        this.fromNavigationFlow.navigateTo().then((previousPage:DummyPage) =>{
            d.resolve(this.pageInstance);
        });
        return d.promise;
        
    }
}