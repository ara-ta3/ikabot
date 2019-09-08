import { init as discordInit } from './applications/Discord';
import { init as herokuKeepAliveInit } from './applications/Heroku';

function main(): void {
    const discordToken: string = process.env.HUBOT_DISCORD_TOKEN;
    const userAgent = process.env.USER_AGENT;
    const port = parseInt(process.env.PORT);
    const keepAliveUrl = process.env.HEROKU_KEEP_ALIVE_URL;
    herokuKeepAliveInit(keepAliveUrl, isNaN(port) ? 8080 : port).catch((e) => {
        console.log('Keep Alive Error');
        console.log(e);
    });
    discordInit(discordToken, userAgent).catch((e) => {
        console.log('Discord Error');
        console.log(e);
    });
}

main();
