import { App, directMention } from '@slack/bolt';
import { Splatoon } from '../services/Splatoon';
import { Bot } from './Bot';

export async function init(
    botToken: string,
    signingSecret: string,
    port: string,
    splatoon: Splatoon
): Promise<unknown> {
    const app = new App({
        token: botToken,
        signingSecret: signingSecret,
    });

    app.error(async (e) => {
        console.error(e);
    });

    const bot: Bot = new Bot('ika', splatoon);
    bot.reactions().forEach((v) => {
        const [re, func, _] = v;
        app.message(re, directMention(), async ({ context, say }) => {
            const matched = context.matched;
            func((m: string) => say(m), matched === null ? [] : matched);
        });
    });
    return await app.start(port);
}
