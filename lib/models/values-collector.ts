/**
 * used for count recourrence on different values
 * const counter = new ValuesCollector();
 * counter.increment('ribbon'); -> add 'ribbon' : 1 or increment 'ribbon' count
 * counter.increment('noRibbon'); -> add 'noRibbon' : 1 or increment 'noRibbon' count
 */
export class ValuesCollector {
    // counter: number = 0;
    values: any = {};
    /**
     * get occurence of specified property
     * @param property propety name
     */
    public get(property: string): number | null {
        if (!this.values.hasOwnProperty(property)) {
            return null;
        }
        return this.values[property];
    }
    /**
     * force occurence for selected value
     * @param property propety name
     * @param value number of occurence
     */
    public set(property: string, value?: number) {
        this.values[property] = value;
    }
    /**
     * incrementproperty occurence by provided number
     * @param property property name
     * @param increment number of occurence to increment, default 1
     */
    public increment(property: string, increment: number = 1) {
        let propValue = this.get(property);
        if (!propValue) {
            propValue = 0;
        }
        propValue += increment;
        this.set(property, propValue);
    }
    /**
     * count property number insiede value or inside provided object
     * @param obj custom object
     */
    public count(obj?: any) {
        if (!obj) {
            obj = this.values;
        }
        let counter = 0;
        for (const property in obj) {
            if (!obj.hasOwnProperty(property)) {
                continue;
            }
            if (Array.isArray(obj[property])) {
                counter += this.count(obj[property]);
            } else {
                counter++;
            }
        }
        return counter;
    }
}
