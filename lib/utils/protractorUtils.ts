import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { Deferred } from 'ts-deferred';
export class ProtractorUtils {

    public static any(css: string, obj?: any): Promise<number> {
        const d: Deferred<number> = new Deferred<number>();
        this.find(css, obj).count()
            .then((result: number)=>{
                d.resolve(result);
            })
        .then(d.reject)
        return d.promise;
    }
    public static findFirst(css: string, obj?: any): any {
        return this.find(css, obj).get(0);
    }
    public static findAndClick(css: string, obj?: any): Promise<void> {
        const d: Deferred<void> = new Deferred<void>();
        this.findFirst(css, obj).click()
        .then(d.resolve)
        .catch(() => {
            d.reject('click failed, el: ' + css);
        });
        return d.promise;
    }
    static writeTo(elIdentify: string, text: string): Promise<void> {
        const d: Deferred<void> = new Deferred<void>();

        this.find(elIdentify).sendKeys(text)
        .then(d.resolve)
        .catch(() => {
            d.reject('writeTo failed, el: ' + elIdentify);
        });
        return d.promise;
    }
    /**
     * Find sibling element
     */
    public static findSibling(elIdentify: string, obj: any): Promise<boolean> {
        const d: Deferred<boolean> = new Deferred<boolean>();
        this.any(elIdentify, obj.element(by.xpath('..')))
            .then((count) => {
                d.resolve(count > 0);
            })
            .catch(d.reject);
        return d.promise;
    }
    /**
     * Generic Find elements
     */
    public static find(elIdentify: string, obj?: any): ElementArrayFinder {
        // check if selector is id or class
        if (elIdentify.indexOf('.') >= 0
            || elIdentify.indexOf(' ') >= 0) {
            // looking for class
            return this.findByCss(elIdentify, obj);
        } else {
            return this.findById(elIdentify, obj);
        }

    }
    /**
     * Find elements by id
     */
    public static findById(id: string, obj?: any): ElementArrayFinder {
        // Define locator
        const locator = by.id(id);
        // Find element and return promise
        return obj ? obj.all(locator) : element.all(locator);
    }
    /**
     * Find elements by css
     */
    public static findByCss(css: string, obj?: any): ElementArrayFinder {
        // Define locator
        const locator = by.css(css);
        // Find element and return promise
        return obj ? obj.all(locator) : element.all(locator);
    }
    /**
     * go back by one level from obj and looking for provided identifier
     */
    public static anyFromParent(elIdentify: string, obj: any): Promise<boolean> {
        // ElementArrayFinder
        const d: Deferred<boolean> = new Deferred<boolean>();
        ProtractorUtils.any(elIdentify, obj.element(by.xpath('..')))
            .then((count) => {
                d.resolve(count > 0);
            })
            .catch(d.reject);
        return d.promise;
    }

    /**
     * from provided element id select optionvalue
     */
    public static selectTo(elIdentify: string, optionValue: string): Promise<void> {
        const d: Deferred<void> = new Deferred<void>();

         element(by.css('select[id="' + elIdentify + '"] option[value="' + optionValue + '"]')).click().then(() => {
             d.resolve();
         })
         .catch(d.reject);

        return d.promise;
    }
}
