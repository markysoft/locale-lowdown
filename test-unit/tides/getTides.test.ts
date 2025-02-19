import { readFileSync } from 'fs'
import { getTideRecord } from '../../src/routes/tides/services/getTides'
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
describe('getTides', () => {
    test('parses tideRecord from RSS', async () => {
        const text = readFileSync(__dirname + '/../testdata/tides.rss', 'utf-8')
        assert.ok(text)
        const tideRecord = getTideRecord(text, 'whitby')
        assert.ok(tideRecord)
        assert.ok(tideRecord.date)
        assert.equal(tideRecord.date, 'Sunday 19 January 2025')
        assert.ok(tideRecord.tides)
        assert.equal(tideRecord.tides.length, 4)
        assert.equal(tideRecord.tides[0].height, 1.35)
        assert.equal(tideRecord.tides[0].type, 'Low')
        assert.equal(tideRecord.tides[0].time, '01:17')
        assert.equal(tideRecord.tides[1].height, 4.87)
        assert.equal(tideRecord.tides[1].type, 'High')
        assert.equal(tideRecord.tides[1].time, '07:22')
        assert.equal(tideRecord.tides[2].height, 1.91)
        assert.equal(tideRecord.tides[2].type, 'Low')
        assert.equal(tideRecord.tides[2].time, '13:14')
        assert.equal(tideRecord.tides[1].time, '07:22')
        assert.equal(tideRecord.tides[3].height, 5.17)
        assert.equal(tideRecord.tides[3].type, 'High')
        assert.equal(tideRecord.tides[3].time, '19:25')
    })

    test('gracefully handles empty results RSS', () => {
        const tideRecord = getTideRecord('', 'whitby')
        assert.ok(tideRecord)
        assert.ok(tideRecord.tides)
        assert.equal(tideRecord.tides.length, 0)
    })
})