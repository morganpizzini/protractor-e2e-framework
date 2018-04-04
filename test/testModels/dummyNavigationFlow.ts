import { NavigationBaseFlow } from '../../lib/workflows/NavigationBaseFlow';
import { Deferred } from "ts-deferred";

export class DummyNavigationFlow extends NavigationBaseFlow {
    navigateTo(): Promise<any> {
        const d: Deferred<void> = new Deferred<void>();
        d.resolve();
        return d.promise;
    }
}