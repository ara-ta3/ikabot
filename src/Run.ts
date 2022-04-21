import { init as discordInit } from './applications/Discord.js';
import { init as slackInit } from './applications/Slack.js';
import { instance as SplatoonServiceInstance } from './services/Splatoon.js';

function main(): void {
    const discordToken: string = process.env.DISCORD_TOKEN;
    const userAgent = process.env.USER_AGENT;
    const splatoon = SplatoonServiceInstance(userAgent);
    discordInit(discordToken, splatoon).catch((e) => {
        console.error('Discord Error');
        console.error(e);
    });

    const slackBotToken = process.env.SLACK_BOT_TOKEN;
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
    const slackAppToken = process.env.SLACK_APP_TOKEN;
    const port = parseInt(process.env.PORT) || 8080;
    slackInit(slackBotToken, slackSigningSecret, slackAppToken, port, splatoon).catch((e) => {
        console.error(`Slack Error`);
        console.error(e);
    });
}

main();
