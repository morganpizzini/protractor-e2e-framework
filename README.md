# Protractor E2E Framework [![Build Status](https://travis-ci.org/morganpizzini/protractor-e2e-framework.svg?branch=master)](https://travis-ci.org/morganpizzini/protractor-e2e-framework) [![Coverage Status](https://coveralls.io/repos/github/morganpizzini/protractor-e2e-framework/badge.svg?branch=master)](https://coveralls.io/github/morganpizzini/protractor-e2e-framework?branch=master)

Typescript library that interfaces with [protractor](https://github.com/angular/protractor) test development framework, offering some helpers and an automatic navigation interface by 'NavigationFlow' and a navigationRouteBook, which can change from test to test for define application navigation actions

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
        "base":""
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

export class BasePage extends BasePage {
    constructor() {
        // set page's browser url key
        // in basePage/workflow acts like placeholder: "start from here"
        super('base');
    }
}
```
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
export class BasePageNavigationFlow extends NavigationBaseFlow<BasePage> {
    /**
     * init base page navigation flow
     */
    constructor() {
        // set workflow page
        super(BasePage);
    }
    /**
     * load browser default url
     */
    public navigateTo(): Promise<void> {
        const d: Deferred<void> = new Deferred<void>();
        // navigation flow actions
        browser.get(FrameworkConfiguration.browserData.base).then(() => {
            d.resolve(this.pageInstance);
        }).catch(d.reject);
        return d.promise;
    }
}

/**
 * signIn navigation flow
 */
export class SignInPageNavigationFlow extends NavigationBaseFlow<SignInPage> {
    /**
     * init signin page navigation flow
     */
    constructor() {
        // set workflow page
        super(SignInPage);
    }
    /**
     * load signin page
     */
    public navigateTo(): Promise<any> {
        const d: Deferred<any> = new Deferred<any>();
        
        //argument validation
        if (_.isEmpty(this.fromNavigationFlow)) {
            d.resolve(this.pageInstance);
            return d.promise;
        }
        // navigate to base navigation
        this.fromNavigationFlow.navigateTo().then((previousPage: BasePage) => {
            // navigation flow actions
            
            //do something with 'previousPage' for reach signInPage (like clicks, browser navigation ecc..)
            
            //resolve returning page
            d.resolve(this.pageInstance);

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
        
        // flowBook registration - can be done by 'from-to' funcion or by chain
        // for reach SignInPage i should navigate from BasePage
        config.registerFlow('base', 'signIn');
        // for reach HomePage i should navigate from BasePage then SignIn
        config.registerFlow('base','signIn')
                            .append('home-page');
                            
        // register by browser url id and type
        FrameworkConfiguration.registerType('base', BasePageNavigationFlow);
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

### Problems? Please let us know

If you run into any problems or issues, **please** let us know so we can address and fix them right away. You can report issues on GitHub:

* [Protractor E2E Framework Bug Reports and Feature Requests](https://github.com/morganpizzini/protractor-e2e-framework/issues)