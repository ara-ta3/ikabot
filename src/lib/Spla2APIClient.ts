import * as request from 'request';
type RequestAPI = request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;

const APIEndpoint = 'https://spla2.yuu26.com'

export interface JsonResponseBody {
    result: {
        regular: Array<Schedule>;
        gachi: Array<Schedule>;
        league: Array<Schedule>;
    }
}

export interface Schedule {
    start: string;
    end: string;
    rule: string;
    maps: Array<string>;
}

export class Spla2APIClient {
    private request: RequestAPI;
    private userAgent: string;
    constructor(request: RequestAPI, userAgent: string) {
        this.request = request;
        this.userAgent = userAgent;
    }

    async getSchedule(): Promise<JsonResponseBody> {
        const body = await this.get(`${APIEndpoint}/schedule`);
        return JSON.parse(body);
    }

    private get(url: string): Promise<string> {
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

