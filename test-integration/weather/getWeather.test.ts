import { getTodayWeather } from '../../src/routes/weather/getWeather'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('getWeather', () => {
    test('parses tideRecord from RSS', async () => {
        const weather = await getTodayWeather()
        assert.ok(weather)
    })
})