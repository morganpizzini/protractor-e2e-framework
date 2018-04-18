import * as _ from "lodash";
import { UrlSchema } from "../models/urlSchema";

export class RegisterFlowCommand
{
    private baseId: string = '';
    constructor(baseId:string) {
        this.baseId = baseId;
    }
    public append(toId: string): RegisterFlowCommand{
        return FrameworkConfiguration.registerFlow(this.baseId,toId);
    }
}

export module FrameworkConfiguration {
    export let workflowNavigationEnabled: boolean = true;
    // todo include moke datas
    export let mockData: any = {};
    export let browserData: UrlSchema = new UrlSchema();
    
    // key-value type definition
    type iocElement = { key: string; value: any;};

    let workflowNavigationBook: iocElement[] = [];
    let registeredArray: iocElement[] = [];

    export function getUrl(urlId: string): string {
        return browserData.urls[urlId];
    }

    export function reset(){
        workflowNavigationEnabled = true;
        browserData = new UrlSchema();
        registeredArray= [];
        workflowNavigationBook= [];
    }
    export function registerFlow<T>(fromId: string, toId: string) : RegisterFlowCommand {
        // should check if in registeredArray exist navigationflow entity
        var registeredIndex = _.findIndex(workflowNavigationBook, (o) => { return o.key === fromId; });
        if (registeredIndex != -1) {
            _.pullAt(workflowNavigationBook, registeredIndex)
        }
        workflowNavigationBook.push({ key: fromId, value: toId });
        return new RegisterFlowCommand(toId);
    }
    export function resolvePreviousFlowKey(valueId: string): any {
        let registeredType = (_.find(workflowNavigationBook, (o) => { return o.value === valueId; }));
        // console.log('registeredType: ',registeredType);
        if (registeredType) {
            // value navigation flow depends on key navigation flow
            return registeredType.key;
        } else {
            // value navigation flow has no dependencies
            return '';
            // throw "Impossible to solve valueId " + valueId + ".. NOT FOUND";
        }
    }
    let decalredTypesArray: iocElement[] = [];
    export function registerType<T>(typeId:string,constructorFn: new () => T) {

        var registeredIndex = _.findIndex(registeredArray, (o) => { return o.key === typeId; });
        if (registeredIndex!=-1) {
            _.pullAt(registeredArray, registeredIndex)
        }
        // registeredArray.push({ key: typeId, value: new constructorFn()});
        registeredArray.push({ key: typeId, value: constructorFn });
    }
    export function resolveType(typeId: string): any {
        let declaredTypeElement = (_.find(decalredTypesArray, (o) => { return o.key === typeId; }));
        // type was already asked before - return value
        if (declaredTypeElement ) {
            return declaredTypeElement.value;
        }
        // first asking for type
        // looking for registered key key
        let registeredType = (_.find(registeredArray, (o) => { return o.key === typeId; }));
        if (registeredType) {
            // registeredKey found
            // new declaration
            const newDeclaredElement = { key: typeId, value: new registeredType.value() };
            // push to declared array type
            decalredTypesArray.push(newDeclaredElement);
            // return instance
            return newDeclaredElement.value;
        } else {
            throw "Impossible to solve typeId " + typeId + ".. NOT FOUND";
        }
    }
    export function unRegisterType(typeId: string) {
        //registeredArray = registeredArray.filter( obj => obj.key!== typeId);
        _.remove(registeredArray, function (n) {
            return n.key == typeId;
        });
    }
    
    export function unRegisterAll() {
        registeredArray = [];
    }
    export function getRegisteredKeys(): any[]{
        return _.map(registeredArray, item => _.pick(item, 'key'));
    }
}
