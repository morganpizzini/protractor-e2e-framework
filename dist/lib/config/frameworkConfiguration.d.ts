import { UrlSchema } from "../models/urlSchema";
export declare module FrameworkConfiguration {
    let workflowNavigationEnabled: boolean;
    let mockData: any;
    let browserData: UrlSchema;
    function getUrl(urlId: string): string;
    function reset(): void;
    function registerType<T>(typeId: string, constructorFn: new () => T): void;
    function unRegisterType(typeId: string): void;
    function unRegisterAll(): void;
    function getRegisteredKeys(): any[];
    function resolveFlow(typeId: string): any;
}
