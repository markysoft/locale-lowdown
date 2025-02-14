import { dashDateStringToDate } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('dashDateStringToDate', () => {
    test('parses date string correctly', () => {
        const date = dashDateStringToDate('2025-02-14')
        assert.equal(date.getFullYear(), 2025)
        assert.equal(date.getMonth(), 1) // February is month 1 (0-indexed)
        assert.equal(date.getDate(), 14)
    })
    test('throws error for invalid date string', () => {
        assert.throws(() => dashDateStringToDate(''))
    })
})