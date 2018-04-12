// Description:
//   Misc
// Commands:
//   hubot hello - hello
//   hubot リグマ - 直近のリーグマッチのルールと時間とマップが出る
//   hubot ガチマ - 直近のガチマッチのルールと時間とマップが出る
//   hubot ナワバリ - 直近のナワバリバトルのルールと時間とマップが出る
//

const request = require('request');
const Http = require('../lib/HttpClient');
const Splatoon = require("../lib/Splatoon");

const USER_AGENT = process.env.USER_AGENT;

const splatoon = new Splatoon(
         new Http(
             request,
             USER_AGENT
         )
);

module.exports = (robot) => {
    robot.respond(/hello$/i, async (msg) => {
        msg.send('hello!');
    });

    robot.respond(/リグマ$/i, async (msg) => {
        const message =  await splatoon.league();
        msg.send(message);
    });

    robot.respond(/ガチマ$/i, async (msg) => {
        const message =  await splatoon.gachi();
        msg.send(message);
    });

    robot.respond(/ナワバリ$/i, async (msg) => {
        const message =  await splatoon.nawabari();
        msg.send(message);
    });
};
