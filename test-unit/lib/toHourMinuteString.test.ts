import { toHourMinuteString } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('toHourMinuteString', () => {
    test('handles single-digit hours', () => {
        const date = new Date('2025-02-14T05:07:00')
        const timeString = toHourMinuteString(date)
        assert.equal(timeString, '05:07')
    })

    test('handles double-digit hours', () => {
        const date = new Date('2025-02-14T12:30:00')
        const timeString = toHourMinuteString(date)
        assert.equal(timeString, '12:30')
    })
})