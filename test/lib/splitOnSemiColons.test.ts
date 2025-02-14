import { splitOnSemiColons } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('splitOnSemiColons', () => {
    test('splits string on semicolons', () => {
        const input = 'a;b;c'
        const result = splitOnSemiColons(input)
        assert.deepEqual(result, ['a', 'b', 'c'])
    })

    test('handles empty input', () => {
        const input = ''
        const result = splitOnSemiColons(input)
        assert.deepEqual(result, [])
    })
})