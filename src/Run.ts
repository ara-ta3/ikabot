import { init as discordInit } from './applications/Discord';

function main(): void {
    const discordToken: string = process.env.HUBOT_DISCORD_TOKEN;
    const userAgent = process.env.USER_AGENT;
    discordInit(discordToken, userAgent).catch((e) => {
        console.log('Discord Error');
        console.log(e);
    });
}

main();
