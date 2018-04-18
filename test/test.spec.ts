import { expect } from 'chai';
import { FrameworkConfiguration } from '../lib/config/frameworkConfiguration';
import { DummyNavigationFlow } from './testModels/dummyNavigationFlow';
import { PippoNavigationFlow } from './testModels/pippoNavigationFlow';
import { MickeyNavigationFlow } from './testModels/mickeyNavigationFlow';
import { MinnieNavigationFlow } from './testModels/minnieNavigationFlow';
import { PlutoNavigationFlow } from './testModels/plutoNavigationFlow';
import { INavigationFlow } from '../lib/workflows/INavigationFlow';

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
        var navigationFlow = config.resolveType('flowX');
        //assert
        expect(navigationFlow).to.exist;
    });

    it('should..', () => {
        //arrange
        //navFlowRegistration registration
        config.registerType('dummy-url', DummyNavigationFlow);
        config.registerType('pippo-url', PippoNavigationFlow);
        config.registerType('pluto-url', PlutoNavigationFlow);
        config.registerType('mickey-url', MickeyNavigationFlow);
        config.registerType('minnie-url', MinnieNavigationFlow);

        // flowBook registration - can be done by 'from-to' funcion or by chain
        // for reach pippo i should navigate from dummy
        config.registerFlow('dummy-url', 'pippo-url');
        // for reach mickey i should navigate from pippo
        config.registerFlow('pippo-url','mickey-url')
                            .append('minnie-url');

        //act
        var navigationFlow = (<INavigationFlow>config.resolveType('minnie-url')).navigateTo();
        //assert
        expect(navigationFlow).to.exist;
    });

    afterEach(() => {

    });
});
