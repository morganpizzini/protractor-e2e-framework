import { NavigationBaseFlow } from '../../index';
import { Deferred } from "ts-deferred";
import { PippoPage } from './pippoPage';
import { PlutoPage } from './plutoPage';
import { MickeyPage } from './mickeyPage';
import * as _ from "lodash";

export class MickeyNavigationFlow extends NavigationBaseFlow<MickeyPage> {
    /**
     *
     */
    constructor() {
        // set workflow page
        super(MickeyPage);
    }
    navigateTo(): Promise<any> {
        const d: Deferred<any> = new Deferred<any>();
        //argument validation
        if (_.isEmpty(this.fromNavigationFlow)) {
            d.resolve(this.pageInstance);
            return d.promise;
        }
        this.fromNavigationFlow.navigateTo().then((previousPage:PlutoPage) =>{
            d.resolve(this.pageInstance);
        })
        return d.promise;
        
    }
}