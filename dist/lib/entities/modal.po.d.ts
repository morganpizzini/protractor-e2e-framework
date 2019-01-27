export declare enum entityIdentifyMethod {
    title = 0,
    class = 1,
    id = 2,
}
export declare abstract class BaseModal {
    protected identifyValue: string;
    private isShowIdentifyMethod;
    modalTitleId: string;
    modalCloseId: string;
    /**
     *
     */
    constructor(identifyValue: string, identifyMethod?: entityIdentifyMethod);
    isShown(): Promise<boolean>;
    private isShowByTitle();
    private isShowByFind();
    isHidden(): Promise<boolean>;
    close(): Promise<void>;
}
