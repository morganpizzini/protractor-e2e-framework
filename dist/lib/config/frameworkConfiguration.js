"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var urlSchema_1 = require("../models/urlSchema");
var RegisterFlowCommand = /** @class */ (function () {
    function RegisterFlowCommand(baseId) {
        this.baseId = '';
        this.baseId = baseId;
    }
    RegisterFlowCommand.prototype.append = function (toId) {
        return FrameworkConfiguration.registerFlow(this.baseId, toId);
    };
    return RegisterFlowCommand;
}());
exports.RegisterFlowCommand = RegisterFlowCommand;
var FrameworkConfiguration;
(function (FrameworkConfiguration) {
    FrameworkConfiguration.workflowNavigationEnabled = true;
    // todo include moke datas
    FrameworkConfiguration.mockData = {};
    FrameworkConfiguration.browserData = new urlSchema_1.UrlSchema();
    var workflowNavigationBook = [];
    var registeredArray = [];
    function getUrl(urlId) {
        return FrameworkConfiguration.browserData.urls[urlId];
    }
    FrameworkConfiguration.getUrl = getUrl;
    function reset() {
        FrameworkConfiguration.workflowNavigationEnabled = true;
        FrameworkConfiguration.browserData = new urlSchema_1.UrlSchema();
        registeredArray = [];
        workflowNavigationBook = [];
    }
    FrameworkConfiguration.reset = reset;
    function registerFlow(fromId, toId) {
        // should check if in registeredArray exist navigationflow entity
        var registeredIndex = _.findIndex(workflowNavigationBook, function (o) { return o.key === fromId; });
        if (registeredIndex != -1) {
            _.pullAt(workflowNavigationBook, registeredIndex);
        }
        workflowNavigationBook.push({ key: fromId, value: toId });
        return new RegisterFlowCommand(toId);
    }
    FrameworkConfiguration.registerFlow = registerFlow;
    function resolvePreviousFlowKey(valueId) {
        var registeredType = (_.find(workflowNavigationBook, function (o) { return o.value === valueId; }));
        // console.log('registeredType: ',registeredType);
        if (registeredType) {
            // value navigation flow depends on key navigation flow
            return registeredType.key;
        }
        else {
            // value navigation flow has no dependencies
            return '';
            // throw "Impossible to solve valueId " + valueId + ".. NOT FOUND";
        }
    }
    FrameworkConfiguration.resolvePreviousFlowKey = resolvePreviousFlowKey;
    var decalredTypesArray = [];
    function registerType(typeId, constructorFn) {
        var registeredIndex = _.findIndex(registeredArray, function (o) { return o.key === typeId; });
        if (registeredIndex != -1) {
            _.pullAt(registeredArray, registeredIndex);
        }
        // registeredArray.push({ key: typeId, value: new constructorFn()});
        registeredArray.push({ key: typeId, value: constructorFn });
    }
    FrameworkConfiguration.registerType = registerType;
    function resolveType(typeId) {
        var declaredTypeElement = (_.find(decalredTypesArray, function (o) { return o.key === typeId; }));
        // type was already asked before - return value
        if (declaredTypeElement) {
            return declaredTypeElement.value;
        }
        // first asking for type
        // looking for registered key key
        var registeredType = (_.find(registeredArray, function (o) { return o.key === typeId; }));
        if (registeredType) {
            // registeredKey found
            // new declaration
            var newDeclaredElement = { key: typeId, value: new registeredType.value() };
            // push to declared array type
            decalredTypesArray.push(newDeclaredElement);
            // return instance
            return newDeclaredElement.value;
        }
        else {
            throw "Impossible to solve typeId " + typeId + ".. NOT FOUND";
        }
    }
    FrameworkConfiguration.resolveType = resolveType;
    function unRegisterType(typeId) {
        //registeredArray = registeredArray.filter( obj => obj.key!== typeId);
        _.remove(registeredArray, function (n) {
            return n.key == typeId;
        });
    }
    FrameworkConfiguration.unRegisterType = unRegisterType;
    function unRegisterAll() {
        registeredArray = [];
    }
    FrameworkConfiguration.unRegisterAll = unRegisterAll;
    function getRegisteredKeys() {
        return _.map(registeredArray, function (item) { return _.pick(item, 'key'); });
    }
    FrameworkConfiguration.getRegisteredKeys = getRegisteredKeys;
})(FrameworkConfiguration = exports.FrameworkConfiguration || (exports.FrameworkConfiguration = {}));
