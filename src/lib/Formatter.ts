import moment from 'moment';

import { Schedule } from '../lib/Spla2APIClient.js';

export function format(schedules: Array<Schedule>): string {
    const dates: Map<string, Array<string>> = new Map();
    schedules.forEach((schedule) => {
        const start = moment(schedule.start);
        const end = moment(schedule.end);
        const key = start.format('YYYY/MM/DD');
        const messages = dates.has(key) ? dates.get(key) : new Array();
        const startString = start.format('HH時');
        const endString = end.format('HH時');
        messages.push(
            `${startString} ~ ${endString} ${schedule.rule} (${schedule.maps.join(', ')})`
        );
        dates.set(key, messages);
    });
    return Array.from(dates.entries())
        .map((kv) => {
            const k = kv[0];
            const v = kv[1];
            return [[k, v.join('\n')].join('\n')];
        })
        .join('\n\n');
}

export function formatCurrent(schedules: Array<Schedule>, currentTime: moment.Moment) {
    const currentRule = schedules.filter((s) => isCurrentRule(s, currentTime));
    if (currentRule.length > 0) {
        return toMessageString(currentRule.pop());
    }
    return 'あれ・・・今の時間帯のルールがないぞ・・・';
}

function isCurrentRule(schedule: Schedule, current: moment.Moment): boolean {
    const start = moment(schedule.start);
    const end = moment(schedule.end);
    return current.isBetween(start, end);
}

function toMessageString(schedule: Schedule): string {
    const start = moment(schedule.start).format('HH時');
    const end = moment(schedule.end).format('HH時');
    return `${start} ~ ${end} ${schedule.rule} (${schedule.maps.join(', ')})`;
}
