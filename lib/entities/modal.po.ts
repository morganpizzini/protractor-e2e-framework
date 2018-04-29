import { browser, by, element, promise } from 'protractor';
import { Deferred } from 'ts-deferred';
import { ProtractorUtils } from '../utils/protractorUtils';
export enum entityIdentifyMethod{
    title,
    class,
    id
}
export abstract class BaseModal {
    protected identifyValue: string = '';
    private isShowIdentifyMethod: any;
    public modalTitleId: string = '.modal-title';
    public modalCloseId: string = '.modal-content .close';
    /**
     *
     */
    constructor(identifyValue: string, identifyMethod: entityIdentifyMethod = entityIdentifyMethod.title) {
        this.identifyValue = identifyValue;
        // set modal identifier method
        switch (identifyMethod) {
            case entityIdentifyMethod.title:
                this.isShowIdentifyMethod = this.isShowByTitle;
                break;
            case entityIdentifyMethod.class:
            case entityIdentifyMethod.id:
                this.isShowIdentifyMethod = this.isShowByFind;
                break;
            default:
                break;
        }
    }
    // is visible
    public isShown(): Promise<boolean> {
        return this.isShowIdentifyMethod();
    }
    private isShowByTitle(): Promise<boolean> {
        const d: Deferred<any> = new Deferred<any>();
        const self = this;
        ProtractorUtils.findFirst(this.modalTitleId).getText().then((txt: string) => {
            d.resolve(txt === self.identifyValue);
        })
            .catch(d.reject);
        return d.promise;
    }
    private isShowByFind(): Promise<boolean> {
        const d: Deferred<any> = new Deferred<any>();
        const self = this;
        ProtractorUtils.any(this.modalTitleId).then((count: number) => {
            d.resolve(count > 0);
        })
            .catch(d.reject);
        return d.promise;
    }
    // is not visible
    public isHidden(): Promise<boolean> {
        return this.isShown().then((res) => !res);
    }

    // close
    public close(): Promise<void> {
        const d: Deferred<any> = new Deferred<any>();
        this.isShown().then(res => {
            if (res) {
                // close modal
                ProtractorUtils.findAndClick(this.modalCloseId)
                    .then(d.resolve)
                    .catch(d.reject)
            } else {
                // modal is already closed
                d.resolve();
            }
        })
            .catch(d.reject);
        return d.promise;
    }
}
