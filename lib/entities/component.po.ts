import { ProtractorUtils } from "../utils/protractorUtils";
import { Deferred } from "ts-deferred";

export class BaseComponent {
    protected elementId: string = '';

    constructor(elementId: string) {
        this.elementId = elementId;
    }
    public getElement(): any {
        return ProtractorUtils.findFirst(this.elementId);
    }
    public IsShown(): Promise<boolean> {
        const d: Deferred<boolean> = new Deferred<boolean>();
        ProtractorUtils.any(this.elementId)
        .then((count)=>{
            d.resolve(count > 0);
        })
        .catch(d.reject)
        return d.promise;
    }
}