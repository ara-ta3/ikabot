const format = require("./Formatter");

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
}

module.exports  = Splatoon;
