import { UrlSchema } from "../models/urlSchema";
export declare class RegisterFlowCommand {
    private baseId;
    constructor(baseId: string);
    append(toId: string): RegisterFlowCommand;
}
export declare module FrameworkConfiguration {
    let workflowNavigationEnabled: boolean;
    let mockData: any;
    let browserData: UrlSchema;
    function getUrl(urlId: string): string;
    function reset(): void;
    function registerFlow<T>(fromId: string, toId: string): RegisterFlowCommand;
    function resolvePreviousFlowKey(valueId: string): any;
    function registerType<T>(typeId: string, constructorFn: new () => T): void;
    function resolveType(typeId: string): any;
    function unRegisterType(typeId: string): void;
    function unRegisterAll(): void;
    function getRegisteredKeys(): any[];
}
