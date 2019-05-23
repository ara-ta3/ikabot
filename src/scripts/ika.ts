// Description:
//   Misc
// Commands:
//   hubot hello - hello
//   hubot リグマ - 直近のリーグマッチのルールと時間とマップが出る
//   hubot ガチマ - 直近のガチマッチのルールと時間とマップが出る
//   hubot ナワバリ - 直近のナワバリバトルのルールと時間とマップが出る
//   hubot 現在 - 今の時間のナワバリ、ガチマッチ、リーグマッチのルールとマップが出る
//   hubot 次 - 次の時間のナワバリ、ガチマッチ、リーグマッチのルールとマップが出る
//   hubot 選んで ..... - 空白とかカンマ区切りの何かから選んでくれる
//   hubot ブキ c {category} - カテゴリに沿ったブキ選んでくれる category = シューター, ブラスター, リールガン, マニューバー, ローラー, フデ, チャージャー, スロッシャー, スピナー, シェルター
//   hubot ブキ t {type} - タイプに沿ったブキ選んでくれる type = シューター, ローラー, チャージャー, スロッシャー, スピナー, シェルター
//   hubot ブキ - 全武器から選んでくれる
//   hubot プラベブキ - アルファ・ブラボー用の武器を全武器から選んでくれる
//

import * as hubot from 'hubot';
import { instance as SplatoonServiceInstance } from '../services/Splatoon';
import { Category, Type, JapaneseToEnglish } from '../lib/StatInk';
import moment = require('moment');

type HubotRobot = hubot.Robot<any>;
type HubotResponse = hubot.Response<HubotRobot>;

const USER_AGENT = process.env.USER_AGENT;
const splatoon = SplatoonServiceInstance(USER_AGENT);

module.exports = (robot: HubotRobot) => {
    robot.respond(/hello$/i, async (msg: HubotResponse) => {
        msg.send('hello!');
    });

    robot.respond(/リグマ$/i, async (msg: HubotResponse) => {
        const message = await splatoon.league();
        msg.send(message);
    });

    robot.respond(/ガチマ$/i, async (msg: HubotResponse) => {
        const message = await splatoon.gachi();
        msg.send(message);
    });

    robot.respond(/ナワバリ$/i, async (msg: HubotResponse) => {
        const message = await splatoon.nawabari();
        msg.send(message);
    });

    robot.respond(/現在$/i, async (msg: HubotResponse) => {
        const current = moment();
        const message = await splatoon.current(current);
        msg.send(message);
    });

    robot.respond(/次$/i, async (msg: HubotResponse) => {
        const message = await splatoon.next();
        msg.send(message);
    });
    robot.respond(/選んで (.+)/i, (msg: HubotResponse) => {
        const items = msg.match[1].split(/[　・,、\s]+/);
        const selected = msg.random(items);
        msg.send(`マンメンミ！ ${selected}`);
    });

    robot.respond(/ブキ c (.+)/i, async (msg: HubotResponse) => {
        const c: string = JapaneseToEnglish(msg.match[1]);
        const category = Category[c as keyof typeof Category];
        const message = await splatoon.weaponByCategory(category);
        msg.send(message);
    });

    robot.respond(/ブキ t (.+)/i, async (msg: HubotResponse) => {
        const t: string = JapaneseToEnglish(msg.match[1]);
        const type = Type[t as keyof typeof Type];
        const message = await splatoon.weaponByType(type);
        msg.send(message);
    });

    robot.respond(/ブキ$/i, async (msg: HubotResponse) => {
        const message = await splatoon.weapon();
        msg.send(message);
    });

    robot.respond(/プラベブキ/i, async (msg: HubotResponse) => {
        const alpha1 = await splatoon.fetchWeapon();
        const alpha2 = await splatoon.fetchWeapon();
        const alpha3 = await splatoon.fetchWeapon();
        const alpha4 = await splatoon.fetchWeapon();
        const beta1 = await splatoon.fetchWeapon();
        const beta2 = await splatoon.fetchWeapon();
        const beta3 = await splatoon.fetchWeapon();
        const beta4 = await splatoon.fetchWeapon();
        const message = [
            `アルファ1 ${alpha1.name}`,
            `アルファ2 ${alpha2.name}`,
            `アルファ3 ${alpha3.name}`,
            `アルファ4 ${alpha4.name}`,
            '',
            `ブラボー1 ${beta1.name}`,
            `ブラボー2 ${beta2.name}`,
            `ブラボー3 ${beta3.name}`,
            `ブラボー4 ${beta4.name}`,
        ].join('\n');
        msg.send(message);
    });
};
