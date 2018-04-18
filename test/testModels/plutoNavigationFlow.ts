import { NavigationBaseFlow } from '../../index';
import { Deferred } from "ts-deferred";
import { DummyPage } from './dummyPage';
import { DummyNavigationFlow } from './dummyNavigationFlow';
import { PlutoPage } from './plutoPage';
import * as _ from "lodash";

export class PlutoNavigationFlow extends NavigationBaseFlow<PlutoPage> {
    /**
     *
     */
    constructor() {
        // set workflowKey
        super(PlutoPage);
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
        })
        return d.promise;
        
    }
}