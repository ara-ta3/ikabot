import * as http from 'http';
import * as request from 'request';
import moment = require('moment');

export async function init(keepAliveUrl: string, port: number): Promise<void> {
    const server = http.createServer((req, res) => {
        console.log(`Accessed. ${req.url}`);
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.end('{}');
    });

    server.listen(port);
    const keepAlive = new KeepAlive(keepAliveUrl, port);
    return await keepAlive.run();
}

class KeepAlive {
    private keepAliveUrl: string;
    private port: number;
    constructor(keepAliveUrl: string, port: number) {
        this.keepAliveUrl = keepAliveUrl;
        this.port = port;
    }

    async run(): Promise<void> {
        while (true) {
            if (this.shouldRun(moment())) {
                await this.request();
            }
            await this.wait(moment.duration(10, 'minutes'));
        }
    }

    shouldRun(moment: moment.Moment): boolean {
        return true;
    }

    wait(d: moment.Duration): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, d.asMilliseconds());
        });
    }

    request(): Promise<void> {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: this.keepAliveUrl,
                    method: 'POST',
                },
                (error, res, body) => {
                    if (error === null && res.statusCode === 200) {
                        resolve(body);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }
}
