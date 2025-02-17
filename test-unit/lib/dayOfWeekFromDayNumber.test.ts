import { dayOfWeekFromDayNumber } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('dayOfWeekFromDayNumber', () => {
    test('returns the correct day of the week from day number', () => {
        assert.strictEqual(dayOfWeekFromDayNumber(0), 'Sunday')
        assert.strictEqual(dayOfWeekFromDayNumber(1), 'Monday')
        assert.strictEqual(dayOfWeekFromDayNumber(2), 'Tuesday')
        assert.strictEqual(dayOfWeekFromDayNumber(3), 'Wednesday')
        assert.strictEqual(dayOfWeekFromDayNumber(4), 'Thursday')
        assert.strictEqual(dayOfWeekFromDayNumber(5), 'Friday')
        assert.strictEqual(dayOfWeekFromDayNumber(6), 'Saturday')
    })
})