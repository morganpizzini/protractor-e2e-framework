/**
 * used for count recourrence on different values
 * const counter = new ValuesCollector();
 * counter.increment('ribbon'); -> add 'ribbon' : 1 or increment 'ribbon' count
 * counter.increment('noRibbon'); -> add 'noRibbon' : 1 or increment 'noRibbon' count
 */
export declare class ValuesCollector {
    values: any;
    /**
     * get occurence of specified property
     * @param property propety name
     */
    get(property: string): number | null;
    /**
     * force occurence for selected value
     * @param property propety name
     * @param value number of occurence
     */
    set(property: string, value?: number): void;
    /**
     * incrementproperty occurence by provided number
     * @param property property name
     * @param increment number of occurence to increment, default 1
     */
    increment(property: string, increment?: number): void;
    /**
     * count property number insiede value or inside provided object
     * @param obj custom object
     */
    count(obj?: any): number;
}
