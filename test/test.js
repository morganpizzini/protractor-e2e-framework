'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('IoC registration tests', () => {
    var config = index.FrameworkConfiguration;
    beforeEach(()=>{
        config.reset();
    });
    it('should register 1 element', () => {
        //arrange
        config.registerType('page',index.BasePage)
        //assert
        expect(config.getRegisteredKeys().length).to.equal(1);
    });
    it('should NOT register 2 element', () => {
        //arrange
        config.registerType('pagei', index.BasePage)
        //assert
        expect(config.getRegisteredKeys().length).to.not.equal(2);
    });
    it('should register same key once', () => {
        //act
        config.registerType('pagex', index.BasePage)
        config.registerType('pagex', index.BasePage)
        //assert
        expect(config.getRegisteredKeys().length).to.equal(1);
    });
    afterEach(() => {

    });
});
