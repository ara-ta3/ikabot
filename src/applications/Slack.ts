import { App, directMention } from '@slack/bolt';
import { Splatoon } from '../services/Splatoon.js';
import { Bot } from './Bot.js';

export async function init(
    botToken: string,
    signingSecret: string,
    appToken: string,
    port: number,
    splatoon: Splatoon
): Promise<unknown> {
    const app = new App({
        token: botToken,
        socketMode: true,
        appToken: appToken,
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
