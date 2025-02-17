import { getTodayWeather } from '../../src/routes/weather/getWeather'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('getWeather', () => {
    test('get live weather from AccuWeather', async () => {
        const weather = await getTodayWeather()
        assert.ok(weather)
    })
})