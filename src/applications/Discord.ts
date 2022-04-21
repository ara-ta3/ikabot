import { Client, Message } from 'discord.js';
import { Splatoon } from '../services/Splatoon.js';
import { Bot } from './Bot.js';

export async function init(token: string, splatoon: Splatoon): Promise<string> {
    const client = new Client();

    client.on('ready', () => {
        const botName = client.user.tag;
        console.log(`Logged in as ${botName}`);
    });

    let bot: Bot | null = null;
    client.on('message', async (message: Message) => {
        if (message.author.bot) {
            return;
        }

        if (!isMentioned(client, message)) {
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

function isMentioned(client: Client, message: Message): boolean {
    const mentionedUserIds = Array.from(message.mentions.users.values()).map((x) => x.id);
    return mentionedUserIds.includes(client.user.id);
}
