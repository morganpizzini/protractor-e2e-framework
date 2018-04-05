# Protractor E2E Framework [![Build Status](https://travis-ci.org/morganpizzini/protractor-e2e-framework.svg?branch=master)](https://travis-ci.org/morganpizzini/protractor-e2e-framework) [![Coverage Status](https://coveralls.io/repos/github/morganpizzini/protractor-e2e-framework/badge.svg?branch=master)](https://coveralls.io/github/morganpizzini/protractor-e2e-framework?branch=master)

Typescript library that interfaces with [protractor](https://github.com/angular/protractor) test development framework, offering some helpers and an automatic navigation interface by 'NavigationFlow'

## Installation

install npm package

```markdown
$ npm install --save-dev protractor-e2e-framework
```

## Getting started
##### Define browser url schema model like
```markdown
{
    "base": "/",
    "urls": {
        "signIn" : "/account/sign-in",
        "home-page" : "/home",
        "post-detail-page" : "/posts/PostId-(\\d+)",
        ..,
        ..
    },
    "paramethers": {
        "PostId": "001",
        ..,
        ..
    }
}
```
each node defines
* base page navigation url
* each navigation page urls
* navigation page urls paramethers
    * when ask for navigate to 'post-detail-page' the compiled url is **"/posts/PostId-001"**

---
##### Extends pages with BasePage
```markdown
import { BasePage } from 'protractor-e2e-framework';

export class SignInPage extends BasePage {
    constructor() {
        // set page's browser url key
        super('signIn');
    }
}
```
---
##### Define navigations flows
```markdown
import { NavigationBaseFlow, FrameworkConfiguration } from 'protractor-e2e-framework';
import { Deferred } from 'ts-deferred';

/**
 * base navigation flow
 */
export class BasePageNavigationFlow extends NavigationBaseFlow {
    /**
     * init base page navigation flow
     */
    constructor() {
        super();
    }
    /**
     * load browser default url
     */
    public navigateTo(): Promise<void> {
        const d: Deferred<void> = new Deferred<void>();
        // navigation flow actions
        browser.get(FrameworkConfiguration.browserData.base).then(() => {
            d.resolve();
        }).catch(d.reject);
        return d.promise;
    }
}

/**
 * signIn navigation flow
 */
export class SignInPageNavigationFlow extends NavigationBaseFlow {
    /**
     * init signin page navigation flow
     */
    constructor() {
        // set base page as starting flow
        super(new BasePageNavigationFlow());
    }
    /**
     * load signin page
     */
    public navigateTo(): Promise<any> {
        const d: Deferred<any> = new Deferred<any>();
        // navigate to base navigation
        this.fromNavigationFlow.navigateTo().then((previousPage: BasePage) => {
            // navigation flow actions
            
            //do something with 'previousPage' for reach signInPage (like clicks, browser navigation ecc..)
            
            //resolve returning page
            d.resolve(new SignInPage());

        }).catch(d.reject);
        return d.promise;
    }
}
```
---

##### Inside each 'beforeEach' functions

```markdown
import { FrameworkConfiguration } from 'protractor-e2e-framework';
import { BasePageNavigationFlow, SignInPageNavigationFlow } from './navigation-flows';

const mockData = require('../resources/mockdata.json');
const browserData = require('../resources/browser-urls.json');

beforeEach(function() {
    // reset all previouis settings
    FrameworkConfiguration.reset();
    
    // setup browser urls
    FrameworkConfiguration.browserData = browserData;
    
    // setup whatever mock datas you need
    FrameworkConfiguration.mockData = mockData;
    
      // #region navigation flows registrations
      // register by browser url id and type
        FrameworkConfiguration.registerType('', BasePageNavigationFlow);
        FrameworkConfiguration.registerType('signIn', SignInPageNavigationFlow);
    // #endregion
    
    // runs with workflows
        FrameworkConfiguration.workflowNavigationEnabled = true;
    // runs with urls
    // FrameworkConfiguration.workflowNavigationEnabled = false;
});
```
---

## Use in tests
```markdown
it('should login', function (done) {
        let signInPage = new SignInPage();
        // based on setups go to page url by workflows or url
        signInPage.goToPageUrl()
        .then(() => {
            // do login operations and expects
        }).catch(done.fail);
    });
```
---

### References
* [protractor](https://github.com/angular/protractor)
* [ts-deferred](https://github.com/shogogg/ts-deferred)
---

### Problems? Please let us know

If you run into any problems or issues, **please** let us know so we can address and fix them right away. You can report issues on GitHub:

* [Protractor E2E Framework Bug Reports and Feature Requests](https://github.com/morganpizzini/protractor-e2e-framework/issues)