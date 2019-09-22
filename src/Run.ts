import { init as discordInit } from './applications/Discord';
import { instance as SplatoonServiceInstance } from './services/Splatoon';

function main(): void {
    const discordToken: string = process.env.DISCORD_TOKEN;
    const userAgent = process.env.USER_AGENT;
    const splatoon = SplatoonServiceInstance(userAgent);
    discordInit(discordToken, splatoon).catch((e) => {
        console.log('Discord Error');
        console.log(e);
    });
}

main();
