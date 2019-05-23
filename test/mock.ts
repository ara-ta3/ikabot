import { Spla2APIClient, JsonResponseBody } from '../src/lib/Spla2APIClient';
import { MockSplat2Reponse } from './Contract';

export class MockSplat2ApiClient implements Spla2APIClient {
    getSchedule(): Promise<JsonResponseBody> {
        return MockSplat2Reponse;
    }
}
