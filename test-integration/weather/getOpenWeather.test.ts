import { getMetWeather } from '../../src/routes/weather/services/getMetWeather'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('getWeather', () => {
    test('get live weather from Met Office', async () => {
        const weather = await getMetWeather()
        console.log('Weather:', weather)
        assert.ok(weather)
    })
})
