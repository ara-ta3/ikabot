import * as hubot from 'hubot';
import { instance as SplatoonServiceInstance } from '../services/Splatoon';
import { Bot } from '../applications/Bot';

type HubotRobot = hubot.Robot<any>;
type HubotResponse = hubot.Response<HubotRobot>;

const USER_AGENT = process.env.USER_AGENT;
const splatoon = SplatoonServiceInstance(USER_AGENT);

module.exports = (robot: HubotRobot) => {
    const bot = new Bot(robot.name, splatoon);
    bot.reactions().forEach((v) => {
        const [re, react, _] = v;
        robot.respond(re, (msg: HubotResponse) => {
            react((m: string) => msg.send(m), msg.match);
        });
    });
};
