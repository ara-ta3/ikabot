const moment = require('moment');

const format = (schedule) => {
  const start = moment(schedule.start);
  const end = moment(schedule.end);
  const startString = start.format('YYYY/MM/DD HH時');
  const endString = end.format('YYYY/MM/DD HH時');
  return `${startString} ~ ${endString} ${schedule.rule} (${schedule.maps.join(", ")})`
}

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
        return json.result.league.map(format).join("\n");
    }

    async gachi() {
        const json = await this.fetchSchedule();
        return json.result.gachi.map(format).join("\n");
    }

    async nawabari() {
        const json = await this.fetchSchedule();
        return json.result.regular.map(format).join("\n");
    }
}

module.exports  = Splatoon;
