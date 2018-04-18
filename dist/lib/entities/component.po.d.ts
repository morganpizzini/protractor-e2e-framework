export declare class BaseComponent {
    protected elementId: string;
    constructor(elementId: string);
    getElement(): any;
    IsShown(): Promise<boolean>;
}
