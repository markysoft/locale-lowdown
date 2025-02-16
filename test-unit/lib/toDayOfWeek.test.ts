import { getDayOfWeek } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('getDayOfWeek', () => {
    test('returns the correct day of the week for a given date', () => {
        const date = new Date(2024, 0, 22) // January 22, 2024 is a Monday
        const dayOfWeek = getDayOfWeek(date)
        assert.strictEqual(dayOfWeek, 'Monday')
    })

    test('returns the correct day of the week for another date', () => {
        const date = new Date(2024, 0, 21) // January 21, 2024 is a Sunday
        const dayOfWeek = getDayOfWeek(date)
        assert.strictEqual(dayOfWeek, 'Sunday')
    })

    test('returns the correct day of the week for yet another date', () => {
        const date = new Date(2024, 2, 20) // March 20, 2024 is a Wednesday
        const dayOfWeek = getDayOfWeek(date)
        assert.strictEqual(dayOfWeek, 'Wednesday')
    })
})