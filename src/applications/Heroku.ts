import * as http from 'http';
import * as request from 'request';
import moment = require('moment');

export async function init(
    keepAliveUrl: string,
    port: number,
    sleepHour: number,
    wakeUpHour: number
): Promise<void> {
    const server = http.createServer((req, res) => {
        console.log(`Accessed. ${req.url}`);
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.end('{}');
    });

    server.listen(port);
    const keepAlive = new KeepAlive(keepAliveUrl, sleepHour, wakeUpHour);
    return await keepAlive.run();
}

/**
 * https://devcenter.heroku.com/articles/free-dyno-hours
 */
class KeepAlive {
    private keepAliveUrl: string;
    private sleepHour: number;
    private wakeUpHour: number;
    constructor(keepAliveUrl: string, sleepHour: number, wakeUpHour: number) {
        this.keepAliveUrl = keepAliveUrl;
    }

    async run(): Promise<void> {
        while (true) {
            if (this.shouldRun(moment())) {
                await this.request();
            }
            await this.wait(moment.duration(10, 'minutes'));
        }
    }

    // TODO add test
    shouldRun(moment: moment.Moment): boolean {
        const currentHour = moment.hour();
        if (this.wakeUpHour <= currentHour) {
            // should be 'if current time is 30 minutes before or not'
            if (Math.abs(this.sleepHour - currentHour) < 2) {
                return false;
            }
            return true;
        }
        return false;
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
