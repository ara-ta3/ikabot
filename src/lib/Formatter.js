const moment = require('moment');

module.exports = (schedules) => {
    const dates = {};
    schedules.forEach((schedule) => {
        const start = moment(schedule.start);
        const end = moment(schedule.end);
        const key = start.format('YYYY/MM/DD');
        if (!(key in dates)) {
            dates[key] = [];
        }
        const startString = start.format('HH時');
        const endString = end.format('HH時');
        dates[key].push(`${startString} ~ ${endString} ${schedule.rule} (${schedule.maps.join(", ")})`);
    });
    return Object.keys(dates).map((key) => {
        return [key, dates[key].join("\n")].join("\n");

    }).join("\n\n");
};
