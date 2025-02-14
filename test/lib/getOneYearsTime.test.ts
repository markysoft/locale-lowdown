import { getOneYearsTime } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('getOneYearsTime', () => {
    test('returns date one year later', () => {
        const date = new Date('2025-02-14')
        const oneYearLater = getOneYearsTime(date)
        assert.equal(oneYearLater.getFullYear(), 2026)
        assert.equal(oneYearLater.getMonth(), 1) // February is month 1 (0-indexed)
        assert.equal(oneYearLater.getDate(), 14)
    })
})