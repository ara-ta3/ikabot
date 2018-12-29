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
//

import * as hubot from 'hubot'
import { instance as SplatoonServiceInstance } from '../lib/Splatoon';

type HubotRobot = hubot.Robot<any>;
type HubotResponse = hubot.Response<HubotRobot>

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
        const message = await splatoon.current();
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
};
