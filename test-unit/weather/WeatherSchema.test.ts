import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { WeatherSchema } from '../../src/routes/weather/schemas/Weather'

describe('WeatherSchema', () => {
    test('should validate and transform weather data correctly', () => {
        const weatherData = {
            date: new Date('2025-02-14'),
            main: 'Cloudy',
            description: 'light rain;scattered clouds',
            chanceOfRain: 0.33333333333333,
            temp: {
                max: 15.2,
                min: 4.9,
                day: 10.1,
                night: 7.4,
            },
            wind: {
                speed: 20,
                maxSpeed: 30,
                degrees: 90,
            },
        }

        const result = WeatherSchema.parse(weatherData)

        assert.strictEqual(result.date, 'Friday')
        assert.strictEqual(result.main, 'Cloudy')
        assert.deepEqual(result.description, ['light rain', 'scattered clouds'])
        assert.strictEqual(result.chanceOfRain, '33%')
        assert.strictEqual(result.temp.max, 15)
        assert.strictEqual(result.temp.min, 5)
        assert.strictEqual(result.temp.day, 10)
        assert.strictEqual(result.temp.night, 7)
        assert.strictEqual(result.wind.speed, 12) // 20 km/h to miles
        assert.strictEqual(result.wind.maxSpeed, 19) // 30 km/h to miles
        assert.strictEqual(result.wind.degrees, 'E')
    })

    test('should handle optional fields correctly', () => {
        const weatherData = {
            temp: {
                max: 15,
                min: 5,
            },
            wind: {
                speed: 20,
            },
        }

        const result = WeatherSchema.parse(weatherData)

        assert.strictEqual(result.temp.max, 15)
        assert.strictEqual(result.temp.min, 5)
        assert.strictEqual(result.wind.speed, 12) // 20 km/h to miles
        assert.strictEqual(result.date, undefined)
        assert.strictEqual(result.main, undefined)
        assert.strictEqual(result.description, undefined)
        assert.strictEqual(result.chanceOfRain, undefined)
        assert.strictEqual(result.wind.maxSpeed, undefined)
        assert.strictEqual(result.wind.degrees, undefined)
    })
})