import { browser, by, element, promise } from 'protractor';
import { Deferred } from 'ts-deferred';
import { FrameworkConfiguration } from '../config/frameworkConfiguration';

export abstract class BasePage {
    protected pageId: string = '';
    protected pageBaseUrl: string = '';
    
    constructor(pageId: string) {
        this.pageId = pageId;
        this.pageBaseUrl = FrameworkConfiguration.browserData.urls[this.pageId];
    }
    getPageId() {
        return this.pageId;
    }
    goToPageUrl() {
        const d: Deferred<void> = new Deferred<void>();
        const self = this;
        this.isAt().then(function (res) {
            return !res ?
                // TODO config - workflow logic or direct url navigation
                self.getCurrentNavigationPattern().then(() => {
                    d.resolve();
                }) :
                d.resolve();
        });
        return d.promise;
    }
    
    isAt(): Promise<boolean> {
        const d: Deferred<boolean> = new Deferred<boolean>();
        browser.getCurrentUrl()
            .then(currentUrl => {
                d.resolve(currentUrl === this.pageBaseUrl);
            })
            .catch((e: any) => {
                d.resolve(false);
            });
        return d.promise;
    }
    // #region private methods
    private getCurrentNavigationPattern(): Promise<void> {
        if (FrameworkConfiguration.workflowNavigationEnabled) {
            // some kind of navigation by workflows
            try {
                return FrameworkConfiguration.resolveType(this.pageId).navigateTo();    
            } catch (error) {
                const d: Deferred<void> = new Deferred<void>();
                d.reject(error);
                return d.promise;
            }
        } else {
            return this.goTo();
        }
    }
    private goTo(): Promise<void> {
        const d: Deferred<void> = new Deferred<void>();
        let navigationUrl = this.pageBaseUrl;
        // /patient-visit-doctor/Patient-001/Visit-001
        if (navigationUrl.indexOf('(') >= 0) {
            // base url is regex
            navigationUrl = this.composeUrl(navigationUrl);
        }
        browser.get(navigationUrl).then(() => {
            d.resolve();
        });
        return d.promise;
    }
    private composeUrl(baseUrl: string): string {
        const strings = baseUrl.split('/');
        const rewriteUrlArr: string[] = [];
        for (let i = 0; i < strings.length; i++) {
            const singleBlock = strings[i];
            if (singleBlock.indexOf('(') >= 0) {
                const urlProp = singleBlock.replace(/ *-\([^)]*\) */g, '');
                rewriteUrlArr.push(singleBlock.replace(/ *\([^)]*\) */g, FrameworkConfiguration.browserData.paramethers[urlProp]));
            } else {
                rewriteUrlArr.push(singleBlock);
            }
        }
        return rewriteUrlArr.join('/');
    }
    // #endregion
}
