import { degreesToCompass } from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('degreesToCompass', () => {
    test('converts degrees to compass direction', () => {
        assert.equal(degreesToCompass(0), 'N')
        assert.equal(degreesToCompass(45), 'NE')
        assert.equal(degreesToCompass(90), 'E')
        assert.equal(degreesToCompass(135), 'SE')
        assert.equal(degreesToCompass(180), 'S')
        assert.equal(degreesToCompass(225), 'SW')
        assert.equal(degreesToCompass(270), 'W')
        assert.equal(degreesToCompass(315), 'NW')
    })
})