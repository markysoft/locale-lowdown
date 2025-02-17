import { getLastSundayOfMonth } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('getLastSundayOfMonth', () => {
    test('should return the correct last Sunday in March 2025', () => {
        const date = getLastSundayOfMonth(2025, 2) // March is month 2 (0-indexed)
        assert.equal(date.getFullYear(), 2025)
        assert.equal(date.getMonth(), 2) // March is month 2 (0-indexed)
        assert.equal(date.getDate(), 30) // Last Sunday in March 2025 is the 30th
    })

    test('should return the correct last Sunday in October 2025', () => {
        const date = getLastSundayOfMonth(2025, 9) // October is month 9 (0-indexed)
        assert.equal(date.getFullYear(), 2025)
        assert.equal(date.getMonth(), 9) // October is month 9 (0-indexed)
        assert.equal(date.getDate(), 26) // Last Sunday in October 2025 is the 26th
    })

    test('should return the correct last Sunday in February 2024 (leap year)', () => {
        const date = getLastSundayOfMonth(2024, 1) // February is month 1 (0-indexed)
        assert.equal(date.getFullYear(), 2024)
        assert.equal(date.getMonth(), 1) // February is month 1 (0-indexed)
        assert.equal(date.getDate(), 25) // Last Sunday in February 2024 is the 25th
    })

    test('should return the correct last Sunday in December 2025', () => {
        const date = getLastSundayOfMonth(2025, 11) // December is month 11 (0-indexed)
        assert.equal(date.getFullYear(), 2025)
        assert.equal(date.getMonth(), 11) // December is month 11 (0-indexed)
        assert.equal(date.getDate(), 28) // Last Sunday in December 2025 is the 28th
    })
})