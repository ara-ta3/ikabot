import * as assert from 'power-assert';
import { Splatoon } from '../../src/services/Splatoon';
import { MockSplat2ApiClient, MockStatInkApiClient } from '../mock';

describe('Splatoon', () => {
    describe('gachi()', async () => {
        it('Succeeds in parsing', async () => {
            const splatoon = new Splatoon(new MockSplat2ApiClient(), new MockStatInkApiClient());
            const gachi = await splatoon.gachi();
            const expected = `2018/04/13
19時 ~ 21時 ガチエリア (海女美術大学, タチウオパーキング)
21時 ~ 23時 ガチホコバトル (ホッケふ頭, デボン海洋博物館)
23時 ~ 01時 ガチアサリ (ザトウマーケット, アロワナモール)

2018/04/14
01時 ~ 03時 ガチエリア (ガンガゼ野外音楽堂, ハコフグ倉庫)
03時 ~ 05時 ガチホコバトル (ショッツル鉱山, フジツボスポーツクラブ)
05時 ~ 07時 ガチヤグラ (チョウザメ造船, Ｂバスパーク)
07時 ~ 09時 ガチアサリ (マンタマリア号, ホッケふ頭)
09時 ~ 11時 ガチエリア (モズク農園, バッテラストリート)
11時 ~ 13時 ガチホコバトル (コンブトラック, アジフライスタジアム)
13時 ~ 15時 ガチアサリ (タチウオパーキング, ハコフグ倉庫)
15時 ~ 17時 ガチヤグラ (海女美術大学, アロワナモール)`;
            assert(expected === gachi);
        });
    });
});
