import * as request from 'request';
type RequestAPI = request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

const APIEndpoint = 'https://stat.ink/api/v2';

export class StatInkAPIClient {
    private request: RequestAPI;
    constructor(request: RequestAPI) {
        this.request = request;
    }

    async getWeapons(): Promise<Array<Weapon>> {
        const body = await this.get(`${APIEndpoint}/weapon`);
        const res: Array<WeaponResponse> = JSON.parse(body);
        return res.map((v) => responseToInternal(v));
    }

    private get(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.request(
                {
                    url: url,
                    method: 'GET',
                },
                (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(response);
                    }
                }
            );
        });
    }
}

export function JapaneseToEnglish(j: string): string {
    const e = javaneseToEnglish.get(j);
    if (e === undefined) {
        return 'Unknown';
    }
    return e;
}

const javaneseToEnglish: Map<string, string> = new Map([
    ['シューター', 'Shooters'],
    ['ブラスター', 'Blasters'],
    ['リールガン', 'Nozzlenose'],
    ['マニューバー', 'Dualies'],
    ['ローラー', 'Rollers'],
    ['フデ', 'Brushes'],
    ['チャージャー', 'Chargers'],
    ['スロッシャー', 'Sloshers'],
    ['スピナー', 'Splatlings'],
    ['シェルター', 'Brellas'],
]);

export enum Type {
    Shooters = 'Shooters',
    Blasters = 'Blasters',
    Nozzlenose = 'Nozzlenose',
    Dualies = 'Dualies',
    Rollers = 'Rollers',
    Brushes = 'Brushes',
    Chargers = 'Chargers',
    Sloshers = 'Sloshers',
    Splatlings = 'Splatlings',
    Brellas = 'Brellas',
    Unknown = 'Unknown',
}

export enum Category {
    Shooters = 'Shooters',
    Rollers = 'Rollers',
    Chargers = 'Chargers',
    Sloshers = 'Sloshers',
    Splatlings = 'Splatlings',
    Brellas = 'Brellas',
    Unknown = 'Unknown',
}

export interface Weapon {
    name: string;
    type: Type;
    category: Category;
}

function responseToInternal(res: WeaponResponse): Weapon {
    let t = Type[res.type.name.en_US as keyof typeof Type];
    if (t === undefined) {
        t = Type.Unknown;
    }
    let c = Category[res.type.category.name.en_US as keyof typeof Category];
    if (c === undefined) {
        c = Category.Unknown;
    }
    return {
        name: res.name.ja_JP,
        type: t,
        category: c,
    };
}

interface WeaponResponse {
    type: {
        name: {
            ja_JP: string;
            en_US: string;
        };
        category: {
            name: {
                ja_JP: string;
                en_US: string;
            };
        };
    };
    name: {
        ja_JP: string;
    };
}
