import * as request from 'request';
import { Weapon, Type, Category } from '../domains/Weapon.js';
type RequestAPI = request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

const APIEndpoint = 'https://stat.ink/api/v2';

export interface StatInkAPIClient {
    getWeapons(): Promise<Array<Weapon>>;
}

export class StatInkAPIClientImpl implements StatInkAPIClient {
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
