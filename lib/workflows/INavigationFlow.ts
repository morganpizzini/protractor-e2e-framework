export interface INavigationFlow {
    // pageInstance: T;
    /**
     * startNavigation
     */
    navigateTo(): Promise<any>;
}
