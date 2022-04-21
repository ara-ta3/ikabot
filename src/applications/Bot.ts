import { Splatoon } from '../services/Splatoon.js';
import moment from 'moment';
import { Pseudo } from '../domains/Pseudo.js';
import { JapaneseToEnglish, Category, Type } from '../domains/Weapon.js';

export class Bot {
    private name: string;
    private splatoon: Splatoon;

    constructor(name: string, splatoon: Splatoon) {
        this.name = name;
        this.splatoon = splatoon;
    }

    reactions(): Array<[RegExp, BotReaction, Help?]> {
        const reactions: Array<[RegExp, BotReaction, Help?]> = [
            [
                /PING/i,
                async (send) => {
                    send('PONG');
                },
                `${this.name} ping - pong`,
            ],
            [
                /リグマ$/,
                async (send) => {
                    const m = await this.splatoon.league();
                    send(m);
                },
                `${this.name} リグマ - 直近のリーグマッチのルールと時間とマップが出る`,
            ],
            [
                /ガチマ$/,
                async (send) => {
                    const m = await this.splatoon.gachi();
                    send(m);
                },
                `${this.name} ガチマ - 直近のガチマッチのルールと時間とマップが出る`,
            ],
            [
                /ナワバリ$/,
                async (send) => {
                    const m = await this.splatoon.nawabari();
                    send(m);
                },
                `${this.name} ナワバリ - 直近のナワバリバトルのルールと時間とマップが出る`,
            ],
            [
                /今$/,
                async (messageSend) => {
                    const current = moment();
                    const m = await this.splatoon.current(current);
                    messageSend(m);
                },
                `${this.name} 今 - 今の時間のナワバリ、ガチマッチ、リーグマッチのルールとマップが出る`,
            ],
            [
                /次$/,
                async (messageSend) => {
                    const m = await this.splatoon.next();
                    messageSend(m);
                },
                `${this.name} 次 - 次の時間のナワバリ、ガチマッチ、リーグマッチのルールとマップが出る`,
            ],
            [
                /選んで (.+)$/i,
                async (messageSend, matched: Array<string>) => {
                    const items = matched[1].split(/[　・,、\s]+/);
                    const selected = random(items);
                    messageSend(`マンメンミ！ ${selected}`);
                },
                `${this.name} 選んで ..... - 空白とかカンマ区切りの何かから選んでくれる`,
            ],
            [
                /ブキ c (.+)$/i,
                async (messageSend, matched: Array<string>) => {
                    const c: string = JapaneseToEnglish(matched[1]);
                    const category = Category[c as keyof typeof Category];
                    const message = await this.splatoon.weaponByCategory(category);
                    messageSend(message);
                },
                `${this.name} ブキ c {category} - カテゴリに沿ったブキ選んでくれる category = シューター, ブラスター, リールガン, マニューバー, ローラー, フデ, チャージャー, スロッシャー, スピナー, シェルター`,
            ],
            [
                /ブキ t (.+)$/i,
                async (messageSend, matched: Array<string>) => {
                    const c: string = JapaneseToEnglish(matched[1]);
                    const type = Type[c as keyof typeof Type];
                    const message = await this.splatoon.weaponByType(type);
                    messageSend(message);
                },
                `${this.name} ブキ t {type} - タイプに沿ったブキ選んでくれる type = シューター, ローラー, チャージャー, スロッシャー, スピナー, シェルター`,
            ],
            [
                /ブキ$/i,
                async (messageSend) => {
                    const message = await this.splatoon.weapon();
                    messageSend(message);
                },
                `${this.name} ブキ - 全武器から選んでくれる`,
            ],
            [
                /プラベブキ$/i,
                async (messageSend) => {
                    const alpha1 = await this.splatoon.fetchWeapon();
                    const alpha2 = await this.splatoon.fetchWeapon();
                    const alpha3 = await this.splatoon.fetchWeapon();
                    const alpha4 = await this.splatoon.fetchWeapon();
                    const beta1 = await this.splatoon.fetchWeapon();
                    const beta2 = await this.splatoon.fetchWeapon();
                    const beta3 = await this.splatoon.fetchWeapon();
                    const beta4 = await this.splatoon.fetchWeapon();
                    const message = [
                        `アルファ1 ${alpha1.name}`,
                        `アルファ2 ${alpha2.name}`,
                        `アルファ3 ${alpha3.name}`,
                        `アルファ4 ${alpha4.name}`,
                        '',
                        `ブラボー1 ${beta1.name}`,
                        `ブラボー2 ${beta2.name}`,
                        `ブラボー3 ${beta3.name}`,
                        `ブラボー4 ${beta4.name}`,
                    ].join('\n');
                    messageSend(message);
                },
                `${this.name} プラベブキ - アルファ・ブラボー用の武器を全武器から選んでくれる`,
            ],
            [
                /(疑|擬)似確*$/,
                async (messageSend) => {
                    const ps = Pseudo;
                    const ms = ps.map((p) => `${p.weaponName}\t${p.gearPoint}\t${p.damage}`);
                    const m = [`ブキ\tギア数\tダメージ`].concat(ms).join('\n');
                    messageSend(m);
                },
                `${this.name} (擬似確|疑似確|擬似|疑似) - 擬似確ブキのギア数とダメージを教えてくれる\nhttps://splatool.net/mainup.html のページを元に追加しています`,
            ],
        ];
        reactions.push([
            /help$/i,
            async (messageSend) => {
                const helps = reactions.map((v) => v[2]).filter((v) => v !== undefined);
                const message = '\n' + helps.join('\n');
                messageSend(message);
            },
        ]);
        return reactions;
    }
}

type BotReaction = (
    messageSend: (message: string) => void,
    matched: Array<string>
) => Promise<void>;

type Help = string;

function random<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
}
