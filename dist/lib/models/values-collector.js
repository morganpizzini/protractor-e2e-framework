"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * used for count recourrence on different values
 * const counter = new ValuesCollector();
 * counter.increment('ribbon'); -> add 'ribbon' : 1 or increment 'ribbon' count
 * counter.increment('noRibbon'); -> add 'noRibbon' : 1 or increment 'noRibbon' count
 */
var ValuesCollector = /** @class */ (function () {
    function ValuesCollector() {
        // counter: number = 0;
        this.values = {};
    }
    /**
     * get occurence of specified property
     * @param property propety name
     */
    ValuesCollector.prototype.get = function (property) {
        if (!this.values.hasOwnProperty(property)) {
            return null;
        }
        return this.values[property];
    };
    /**
     * force occurence for selected value
     * @param property propety name
     * @param value number of occurence
     */
    ValuesCollector.prototype.set = function (property, value) {
        this.values[property] = value;
    };
    /**
     * incrementproperty occurence by provided number
     * @param property property name
     * @param increment number of occurence to increment, default 1
     */
    ValuesCollector.prototype.increment = function (property, increment) {
        if (increment === void 0) { increment = 1; }
        var propValue = this.get(property);
        if (!propValue) {
            propValue = 0;
        }
        propValue += increment;
        this.set(property, propValue);
    };
    /**
     * count property number insiede value or inside provided object
     * @param obj custom object
     */
    ValuesCollector.prototype.count = function (obj) {
        if (!obj) {
            obj = this.values;
        }
        var counter = 0;
        for (var property in obj) {
            if (!obj.hasOwnProperty(property)) {
                continue;
            }
            if (Array.isArray(obj[property])) {
                counter += this.count(obj[property]);
            }
            else {
                counter++;
            }
        }
        return counter;
    };
    return ValuesCollector;
}());
exports.ValuesCollector = ValuesCollector;
