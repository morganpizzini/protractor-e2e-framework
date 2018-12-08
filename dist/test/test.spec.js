"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../index");
var dummyNavigationFlow_1 = require("./testModels/dummyNavigationFlow");
var pippoNavigationFlow_1 = require("./testModels/pippoNavigationFlow");
var mickeyNavigationFlow_1 = require("./testModels/mickeyNavigationFlow");
var minnieNavigationFlow_1 = require("./testModels/minnieNavigationFlow");
var plutoNavigationFlow_1 = require("./testModels/plutoNavigationFlow");
describe('IoC registration tests', function () {
    var config = index_1.FrameworkConfiguration;
    beforeEach(function () {
        config.reset();
    });
    it('should register 1 element', function () {
        //arrange
        config.registerType('flowX', dummyNavigationFlow_1.DummyNavigationFlow);
        //assert
        chai_1.expect(config.getRegisteredKeys().length).to.equal(1);
    });
    it('should NOT register 2 element', function () {
        //arrange
        config.registerType('flowX', dummyNavigationFlow_1.DummyNavigationFlow);
        //assert
        chai_1.expect(config.getRegisteredKeys().length).to.not.equal(2);
    });
    it('should register same key once', function () {
        //act
        config.registerType('flowX', dummyNavigationFlow_1.DummyNavigationFlow);
        config.registerType('flowX', dummyNavigationFlow_1.DummyNavigationFlow);
        //assert
        chai_1.expect(config.getRegisteredKeys().length).to.equal(1);
    });
    it('should retrive registered navigaitonFlow and navigate', function () {
        //act
        config.registerType('flowX', dummyNavigationFlow_1.DummyNavigationFlow);
        var navigationFlow = config.resolveType('flowX');
        //assert
        chai_1.expect(navigationFlow).to.exist;
    });
    it('should..', function () {
        //arrange
        //navFlowRegistration registration
        config.registerType('dummy-url', dummyNavigationFlow_1.DummyNavigationFlow);
        config.registerType('pippo-url', pippoNavigationFlow_1.PippoNavigationFlow);
        config.registerType('pluto-url', plutoNavigationFlow_1.PlutoNavigationFlow);
        config.registerType('mickey-url', mickeyNavigationFlow_1.MickeyNavigationFlow);
        config.registerType('minnie-url', minnieNavigationFlow_1.MinnieNavigationFlow);
        // flowBook registration - can be done by 'from-to' funcion or by chain
        // for reach pippo i should navigate from dummy
        config.registerFlow('dummy-url', 'pippo-url');
        // for reach mickey i should navigate from pippo
        config.registerFlow('pippo-url', 'mickey-url')
            .append('minnie-url');
        //act
        var navigationFlow = config.resolveType('minnie-url').navigateTo();
        //assert
        chai_1.expect(navigationFlow).to.exist;
    });
    afterEach(function () {
    });
});
