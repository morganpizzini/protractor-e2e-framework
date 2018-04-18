export declare abstract class BaseModal {
    protected modalTitle: string;
    modalTitleId: string;
    modalCloseId: string;
    /**
     *
     */
    constructor(modalTitle: string);
    isShown(): Promise<boolean>;
    isHidden(): Promise<boolean>;
    close(): Promise<void>;
}
