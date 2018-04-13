const moment = require('moment');
const Schedule = require('../model/Schedule');

module.exports = (schedules, currentTime) => {
    const ss = schedules.map(Schedule.fromJson);
    const currentRule = ss.filter((s) => s.timeSpan.between(currentTime));
    if (ss.length > 0) {
        return currentRule.pop().toMessageString();
    }
    return 'あれ・・・今の時間帯のルールがないぞ・・・';
};
