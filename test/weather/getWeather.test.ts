import { getTodayWeather } from '../../src/routes/weather/getWeather'
import { describe, it } from 'node:test'
import assert from 'assert'

describe('getWeather', () => {
    it('parses tideRecord from RSS', async () => {
        const weather = await getTodayWeather()
        assert.ok(weather)
    })
})