import { Client, Message } from 'discord.js';
import { instance as SplatoonServiceInstance } from '../services/Splatoon';
import { Bot } from './Bot';

export async function init(token: string, userAgent: string): Promise<string> {
    const client = new Client();
    const splatoon = SplatoonServiceInstance(userAgent);

    client.on('ready', () => {
        const botName = client.user.tag;
        console.log(`Logged in as ${botName}`);
    });

    let bot: Bot | null = null;
    client.on('message', async (message: Message) => {
        if (message.author.bot) {
            return;
        }
        if (bot === null) {
            bot = new Bot(client.user.tag, splatoon);
        }
        const reactions = bot.reactions();
        reactions.forEach((v) => {
            const [re, func, _] = v;
            if (message.content.match(re)) {
                const matched = re.exec(message.content);
                func((m: string) => message.reply(m), matched === null ? [] : matched);
            }
        });
    });

    return await client.login(token);
}
