export declare abstract class BasePage {
    protected pageId: string;
    protected pageBaseUrl: string;
    constructor(pageId: string);
    goToPageUrl(): Promise<void>;
    isAt(): Promise<boolean>;
    private getCurrentNavigationPattern();
    private goTo();
    private composeUrl(baseUrl);
}
