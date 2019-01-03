import * as moment from 'moment';
import * as request from 'request';
import * as NodeCache from 'node-cache';

import { format, formatCurrent } from '../lib/Formatter';
import { Spla2APIClient, JsonResponseBody } from '../lib/Spla2APIClient';

export function instance(userAgent: string): Splatoon {
    return new Splatoon(new Spla2APIClient(request, userAgent));
}

class Splatoon {
    private CACHE_KEY: string = 'splatoon_schedule';
    private client: Spla2APIClient;
    private cache: NodeCache;
    constructor(client: Spla2APIClient, cache: NodeCache = new NodeCache()) {
        this.client = client;
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

    private async fetchSchedule(): Promise<JsonResponseBody> {
        const cached = this.cache.get<JsonResponseBody>(this.CACHE_KEY);
        if (cached !== undefined) {
            return cached;
        }
        const res = await this.client.getSchedule();
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
