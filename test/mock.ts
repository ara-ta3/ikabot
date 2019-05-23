import { Spla2APIClient, JsonResponseBody } from '../src/lib/Spla2APIClient';
import { MockSplat2Reponse } from './Contract';
import { StatInkAPIClient, Weapon } from '../src/lib/StatInk';

export class MockSplat2ApiClient implements Spla2APIClient {
    getSchedule(): Promise<JsonResponseBody> {
        return MockSplat2Reponse;
    }
}

export class MockStatInkApiClient implements StatInkAPIClient {
    getWeapons(): Promise<Weapon[]> {
        throw new Error('Method not implemented.');
    }
}
