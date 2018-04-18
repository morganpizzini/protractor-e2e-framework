"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var urlSchema_1 = require("../models/urlSchema");
var FrameworkConfiguration;
(function (FrameworkConfiguration) {
    FrameworkConfiguration.workflowNavigationEnabled = true;
    // todo include moke datas
    FrameworkConfiguration.mockData = {};
    FrameworkConfiguration.browserData = new urlSchema_1.UrlSchema();
    var registeredArray = [];
    function getUrl(urlId) {
        return FrameworkConfiguration.browserData.urls[urlId];
    }
    FrameworkConfiguration.getUrl = getUrl;
    function reset() {
        FrameworkConfiguration.workflowNavigationEnabled = true;
        FrameworkConfiguration.browserData = new urlSchema_1.UrlSchema();
        registeredArray = [];
    }
    FrameworkConfiguration.reset = reset;
    function registerType(typeId, constructorFn) {
        var registeredIndex = _.findIndex(registeredArray, function (o) { return o.key === typeId; });
        if (registeredIndex != -1) {
            _.pullAt(registeredArray, registeredIndex);
        }
        registeredArray.push({ key: typeId, value: new constructorFn() });
    }
    FrameworkConfiguration.registerType = registerType;
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
    // export function registerType(typeId:string){
    //     // todo register new type
    // }
    function resolveFlow(typeId) {
        // TODO think about automatic resolve by page type
        var registeredType = (_.find(registeredArray, function (o) { return o.key === typeId; }));
        if (registeredType) {
            return registeredType.value;
        }
        else {
            throw "Impossible to solve typeId " + typeId + ".. NOT FOUND";
        }
    }
    FrameworkConfiguration.resolveFlow = resolveFlow;
})(FrameworkConfiguration = exports.FrameworkConfiguration || (exports.FrameworkConfiguration = {}));
