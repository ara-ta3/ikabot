import * as request from 'request';
import * as NodeCache from 'node-cache';

type RequestAPI = request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

export function instance(): WeaponRepository {
    return new WeaponRepositoryOnStatInk(request);
}

export class WeaponRepositoryOnStatInk implements WeaponRepository {
    private request: RequestAPI;
    private cache: NodeCache;

    constructor(request: RequestAPI, cache: NodeCache = new NodeCache()) {

    }
    fetch(): Promise<Array<Weapon>> {
        return Promise.resolve(new Array());
    }
}

interface WeaponRepository {
    fetch(): Promise<Array<Weapon>>
}

interface StatInkWeapon {
    key: string;
    type: {
        key: string,
    },
    name: {
        ja_JP: string;
    },
    sub: {
        key: string;
        name: {
            ja_JP: string;
        }
    },
    special: {
        key: string;
        name: {
            ja_JP: string;
        }
    }
}