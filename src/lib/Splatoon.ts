import * as moment from 'moment';
import * as request from 'request';
import * as NodeCache from 'node-cache';

import { format, formatCurrent, Schedule } from './Formatter'
type RequestAPI = request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

export function instance(userAgent: string): Splatoon {
    return new Splatoon(
        new HttpClient(
            request,
            userAgent
        )
    );
}

class Splatoon {
    private CACHE_KEY: string = 'splatoon_schedule'
    private client: HttpClient;
    private cache: NodeCache;
    constructor(client: HttpClient, cache: NodeCache = new NodeCache()) {
        this.client = client;
        this.cache = cache
    }

    async fetchSchedule(): Promise<JsonResponseBody> {
        const cached = this.cache.get<JsonResponseBody>(this.CACHE_KEY);
        if (cached !== undefined) {
            return cached;
        }
        const body = await this.client.get('https://spla2.yuu26.com/schedule');
        const res = JSON.parse(body);
        const ttl = this.calculateTTL(moment());
        this.cache.set(this.CACHE_KEY, res, ttl);
        return res;
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
            formatCurrent(json.result.league, currentTime)
        ].join('\n');
    }

    async next(): Promise<string> {
        const json = await this.fetchSchedule();
        const next = moment().add(2, 'h');
        return [
            '今のステージは、ここだ！',
            formatCurrent(json.result.regular, next),
            formatCurrent(json.result.gachi, next),
            formatCurrent(json.result.league, next)
        ].join('\n');
    }


    private calculateTTL(currentTime: moment.Moment): number {
        const hour = currentTime.hour().valueOf();
        const min = currentTime.minute().valueOf();
        const hourSec = (hour % 2 === 1 ? 1 : 0) * 60 * 60;
        const minSec = (60 - min) * 60;
        const ttl = (hourSec + minSec)
        return ttl;
    }
}

interface JsonResponseBody {
    result: {
        regular: Array<Schedule>;
        gachi: Array<Schedule>;
        league: Array<Schedule>;
    }
}

class HttpClient {
    private request: RequestAPI;
    private userAgent: string;
    constructor(request: RequestAPI, userAgent: string) {
        this.request = request;
        this.userAgent = userAgent;
    }

    get(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.request(
                {
                    url: url,
                    method: 'GET',
                    headers: {
                        'User-Agent': this.userAgent
                    }
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

