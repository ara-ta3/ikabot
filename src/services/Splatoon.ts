import * as moment from 'moment';
import * as request from 'request';
import * as NodeCache from 'node-cache';

import { format, formatCurrent } from '../lib/Formatter';
import { Spla2APIClient, JsonResponseBody } from '../lib/Spla2APIClient';
import { StatInkAPIClient, Category, Weapon, Type } from '../lib/StatInk';

export function instance(userAgent: string): Splatoon {
    return new Splatoon(new Spla2APIClient(request, userAgent), new StatInkAPIClient(request));
}

class Splatoon {
    private CACHE_KEY: string = 'splatoon_schedule';
    private STATINK_WEAPON_CACHE_KEY: string = 'statink_weapons';
    private spla2APIClient: Spla2APIClient;
    private statInkAPIClient: StatInkAPIClient;
    private cache: NodeCache;
    constructor(
        spla2APIClient: Spla2APIClient,
        statInkAPIClient: StatInkAPIClient,
        cache: NodeCache = new NodeCache()
    ) {
        this.spla2APIClient = spla2APIClient;
        this.statInkAPIClient = statInkAPIClient;
        this.cache = cache;
    }

    async league(): Promise<string> {
        const json = await this.fetchSchedule();
        return format(json.result.league);
    }

    async gachi(): Promise<string> {
        const json = await this.fetchSchedule();
        return format(json.result.gachi);
    }

    async nawabari(): Promise<string> {
        const json = await this.fetchSchedule();
        return format(json.result.regular);
    }

    async current(): Promise<string> {
        const json = await this.fetchSchedule();
        const currentTime = moment();
        return [
            '今のステージは、ここだ！',
            formatCurrent(json.result.regular, currentTime),
            formatCurrent(json.result.gachi, currentTime),
            formatCurrent(json.result.league, currentTime),
        ].join('\n');
    }

    async next(): Promise<string> {
        const json = await this.fetchSchedule();
        const next = moment().add(2, 'h');
        return [
            '今のステージは、ここだ！',
            formatCurrent(json.result.regular, next),
            formatCurrent(json.result.gachi, next),
            formatCurrent(json.result.league, next),
        ].join('\n');
    }

    async weapon(fn: (w: Weapon) => Boolean = (_: Weapon) => true): Promise<string> {
        const weapons = await this.fetchWeapons();
        const ws = weapons.filter(fn);
        if (ws.length === 0) {
            return 'あれ・・・武器がないぞ';
        }
        const w = ws[Math.floor(Math.random() * ws.length)];
        return `選ばれたのは${w.name}でした`;
    }

    async weaponByCategory(category: Category): Promise<string> {
        return this.weapon((w) => (w.category as Category) === (category as Category));
    }

    async weaponByType(type: Type): Promise<string> {
        return this.weapon((w) => (w.type as Type) === (type as Type));
    }

    async fetchWeapon(): Promise<Weapon> {
        const weapons = await this.fetchWeapons();
        if (weapons.length === 0) {
            throw new Error('Weapon Not Found');
        }
        const w = weapons[Math.floor(Math.random() * weapons.length)];
        return w;
    }

    private async fetchWeapons(): Promise<Array<Weapon>> {
        const cached = this.cache.get<Array<Weapon>>(this.STATINK_WEAPON_CACHE_KEY);
        if (cached !== undefined) {
            return cached;
        }
        const res = await this.statInkAPIClient.getWeapons();
        const ttl = this.calculateTTL(moment());
        this.cache.set(this.STATINK_WEAPON_CACHE_KEY, res, ttl);
        return res;
    }

    private async fetchSchedule(): Promise<JsonResponseBody> {
        const cached = this.cache.get<JsonResponseBody>(this.CACHE_KEY);
        if (cached !== undefined) {
            return cached;
        }
        const res = await this.spla2APIClient.getSchedule();
        const ttl = this.calculateTTL(moment());
        this.cache.set(this.CACHE_KEY, res, ttl);
        return res;
    }

    private calculateTTL(currentTime: moment.Moment): number {
        const hour = currentTime.hour().valueOf();
        const min = currentTime.minute().valueOf();
        const hourSec = (hour % 2 === 1 ? 1 : 0) * 60 * 60;
        const minSec = (60 - min) * 60;
        const ttl = hourSec + minSec;
        return ttl;
    }
}
