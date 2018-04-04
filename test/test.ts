import { expect } from 'chai';
import { FrameworkConfiguration } from '../lib/config/frameworkConfiguration';
import { DummyNavigationFlow } from './testModels/DummyNavigationFlow';

describe('IoC registration tests', () => {
    var config = FrameworkConfiguration;

    beforeEach(() => {
        config.reset();
    });
    it('should register 1 element', () => {
        //arrange
        config.registerType('flowX', DummyNavigationFlow)
        //assert
        expect(config.getRegisteredKeys().length).to.equal(1);
    });
    it('should NOT register 2 element', () => {
        //arrange
        config.registerType('flowX', DummyNavigationFlow)
        //assert
        expect(config.getRegisteredKeys().length).to.not.equal(2);
    });
    it('should register same key once', () => {
        //act
        config.registerType('flowX', DummyNavigationFlow)
        config.registerType('flowX', DummyNavigationFlow)
        //assert
        expect(config.getRegisteredKeys().length).to.equal(1);
    });
    it('should retrive registered navigaitonFlow and navigate', () => {
        //act
        config.registerType('flowX', DummyNavigationFlow);
        var navigationFlow = config.resolveFlow('flowX');
        //assert
        expect(navigationFlow).to.exist;
    });
    afterEach(() => {

    });
});
