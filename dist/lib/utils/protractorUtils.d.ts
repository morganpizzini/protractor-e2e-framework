import { ElementArrayFinder } from 'protractor';
export declare class ProtractorUtils {
    static any(css: string, obj?: any): Promise<number>;
    static findFirst(css: string, obj?: any): any;
    static findAndClick(css: string, obj?: any): Promise<void>;
    static writeTo(elIdentify: string, text: string): Promise<void>;
    /**
     * Find sibling element
     */
    static findSibling(elIdentify: string, obj: any): Promise<boolean>;
    /**
     * Generic Find elements
     */
    static find(elIdentify: string, obj?: any): ElementArrayFinder;
    /**
     * Find elements by id
     */
    static findById(id: string, obj?: any): ElementArrayFinder;
    /**
     * Find elements by css
     */
    static findByCss(css: string, obj?: any): ElementArrayFinder;
    /**
     * go back by one level from obj and looking for provided identifier
     */
    static anyFromParent(elIdentify: string, obj: any): Promise<boolean>;
    /**
     * from provided element id select optionvalue
     */
    static selectTo(elIdentify: string, optionValue: string): Promise<void>;
}
