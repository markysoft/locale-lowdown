import { kmToMiles } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('kmToMiles', () => {
    test('converts kilometers to miles', () => {
        assert.equal(kmToMiles(1), 1)
        assert.equal(kmToMiles(5), 3)
        assert.equal(kmToMiles(10), 6)
    })
})