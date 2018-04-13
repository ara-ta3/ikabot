const moment = require("moment");

class Schedule {
    constructor(
        rule,
        maps,
        timeSpan
    ) {
        this.rule = rule;
        this.maps = maps;
        this.timeSpan = timeSpan;
    }

    static fromJson(schedule) {
        return new Schedule(
            schedule.rule,
            schedule.maps,
            new TimeSpan(
                schedule.start,
                schedule.end
            )
        );
    }

    toMessageString() {
        const start = moment(this.timeSpan.start).format('HH時');
        const end = moment(this.timeSpan.end).format('HH時');
        return `${start} ~ ${end} ${this.rule} (${this.maps.join(", ")})`;
    }
}

class TimeSpan {
    constructor(startString, endString) {
        this.start = startString;
        this.end = endString;
    }

    between(currentTimeString) {
        return moment(currentTimeString).isBetween(this.start, this.end);
    }
}

module.exports = Schedule;
