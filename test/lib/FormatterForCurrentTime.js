"use strict"

const assert = require("power-assert");
const moment = require('moment');
const json = require("../mock");
const format = require("../../src/lib/FormatterForCurrentTime");

describe("FormatterForCurrentTime", () => {
    it("日付ごとに分けられてること", () => {
        const actual = format(json.result.gachi, moment('2018-04-13 19:30:00'));
        const expected = `19時 ~ 21時 ガチエリア (海女美術大学, タチウオパーキング)`;
        assert.equal(actual, expected);
    });
});
