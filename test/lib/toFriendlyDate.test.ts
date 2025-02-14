import { toFriendlyDate } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('toFriendlyDate', () => {
    test('formats date correctly', () => {
        const date = new Date('2025-02-14')
        const friendlyDate = toFriendlyDate(date)
        assert.equal(friendlyDate, 'Friday 14 February 2025')
    })
})