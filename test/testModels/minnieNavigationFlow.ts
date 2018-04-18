import { NavigationBaseFlow } from '../../index';
import { Deferred } from "ts-deferred";
import { MickeyPage } from './mickeyPage';
import { MinniePage } from './minniePage';
import * as _ from "lodash";

export class MinnieNavigationFlow extends NavigationBaseFlow<MinniePage> {
    /**
     *
     */
    constructor() {
        // set workflow page
        super(MinniePage);
    }
    navigateTo(): Promise<any> {
        const d: Deferred<any> = new Deferred<any>();
        //argument validation
        if (_.isEmpty(this.fromNavigationFlow)) {
            d.resolve(this.pageInstance);
            return d.promise;
        }
        this.fromNavigationFlow.navigateTo().then((previousPage:MickeyPage) =>{
            d.resolve(this.pageInstance);
        })
        return d.promise;
        
    }
}