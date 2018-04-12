
class Splatoon {
    constructor(client) {
        this.client = client;
    }

    async league() {
        const res = await this.client.get('https://spla2.yuu26.com/schedule');
        const json = JSON.parse(res.body);
        return json.result.league.map((s) => {
            return `${s.start} ~ ${s.end} - ${s.rule} (${s.maps.join(", ")})`;
        }).join("\n");
    }

    async gachi() {
        const res = await this.client.get('https://spla2.yuu26.com/schedule');
        const json = JSON.parse(res.body);
        return json.result.league.map((s) => {
            return `${s.start} ~ ${s.end} - ${s.rule} (${s.maps.join(", ")})`;
        }).join("\n");
    }

    async nawabari() {
        const res = await this.client.get('https://spla2.yuu26.com/schedule');
        const json = JSON.parse(res.body);
        return json.result.league.map((s) => {
            return `${s.start} ~ ${s.end} - ${s.rule} (${s.maps.join(", ")})`;
        }).join("\n");
    }
}

module.exports  = Splatoon;
