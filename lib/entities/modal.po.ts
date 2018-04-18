import { browser, by, element, promise } from 'protractor';
import { Deferred } from 'ts-deferred';
import { ProtractorUtils } from '../utils/protractorUtils';
export abstract class BaseModal {
    protected modalTitle: string = '';
    public modalTitleId: string = '.modal-title';
    public modalCloseId: string = '.modal-content .close';
    /**
     *
     */
    constructor(modalTitle: string) {
        this.modalTitle = modalTitle;
    }
    // is visible
    public isShown(): Promise<boolean> {
        const d: Deferred<any> = new Deferred<any>();
        const self = this;
        ProtractorUtils.findFirst(this.modalTitleId).getText().then((txt: string) => {
            d.resolve(txt === self.modalTitle);
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
