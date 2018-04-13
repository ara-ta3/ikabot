const moment = require('moment');

const format = require("./Formatter");
const formatCurrent = require("./FormatterForCurrentTime");

class Splatoon {
    constructor(client) {
        this.client = client;
    }

    async fetchSchedule() {
        const res = await this.client.get('https://spla2.yuu26.com/schedule');
        const json = JSON.parse(res.body);
        return json;
    }

    async league() {
        const json = await this.fetchSchedule();
        return format(json.result.league);
    }

    async gachi() {
        const json = await this.fetchSchedule();
        return format(json.result.gachi);
    }

    async nawabari() {
        const json = await this.fetchSchedule();
        return format(json.result.regular);
    }

    async current() {
        const json = await this.fetchSchedule();
        const currentTime = moment();
        return [
            '今のステージは、ここだ！',
            formatCurrent(json.result.regular, currentTime),
            formatCurrent(json.result.gachi, currentTime),
            formatCurrent(json.result.league, currentTime)
        ].join('\n');
    }

    async next() {
        const json = await this.fetchSchedule();
        const next = moment().add(2, 'h');
        return [
            '今のステージは、ここだ！',
            formatCurrent(json.result.regular, next),
            formatCurrent(json.result.gachi, next),
            formatCurrent(json.result.league, next)
        ].join('\n');
    }

}

module.exports  = Splatoon;
