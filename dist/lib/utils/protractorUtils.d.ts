import { ElementArrayFinder } from 'protractor';
export declare class ProtractorUtils {
    static any(css: string, obj?: any): Promise<number>;
    static findFirst(css: string, obj?: any): any;
    static findAndClick(css: string, obj?: any): Promise<void>;
    static writeTo(elIdentify: string, text: string): Promise<void>;
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
}
