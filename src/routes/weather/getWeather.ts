import { SunSchema } from './schemas/SunSchema'
import { MoonSchema } from './schemas/Moon'
import { WeekAheadDay, WeatherSchema } from './schemas/Weather'
import { AccuWeather, AccuWeatherWeek } from './schemas/AccuWeather'
import { AccuWeatherApiKey } from '../../secretConfig'

const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/54400_PC?apikey=${AccuWeatherApiKey}&details=true&metric=true`

function mapWeather(todayWeather: AccuWeather): WeekAheadDay {
  const {
    Temperature: { Maximum: { Value: max } },
    Temperature: { Minimum: { Value: min } },
    EpochDate: date,
    Day: {
      Wind: {
        Speed: { Value: speed },
        Direction: { Degrees: degrees },
      },
      IconPhrase: main,
      LongPhrase: description,
    },
    Day: {
      WindGust: {
        Speed: { Value: maxSpeed },
      },
      RainProbability: chanceOfRain,
    },
    Sun: { EpochRise: sunrise, EpochSet: sunset },
    Moon: { EpochRise: moonrise, EpochSet: moonset },
    Moon: { Phase: moon_phase },
    Moon: { Age: age },
  } = todayWeather

  return {
    weather: WeatherSchema.parse({
      date: new Date(date * 1000),
      main,
      description,
      chanceOfRain: chanceOfRain / 100,
      temp: { max, min },
      wind: { speed, maxSpeed, degrees },
    }),
    sun: SunSchema.parse({ rise: sunrise * 1000, set: sunset * 1000 }),
    moon: MoonSchema.parse({ rise: moonrise * 1000, set: moonset * 1000, phaseDesc: moon_phase, phase: age / 28 }),
  }
}

async function callWeatherApi(): Promise<AccuWeatherWeek> {
  const result = await fetch(url)
  if (!result.ok) {
    throw new Error('Rate limit exceeded')
  }

  return await result.json()
}

export async function getTodayWeather(): Promise<WeekAheadDay> {
  const week = await callWeatherApi()
  return mapWeather(week.DailyForecasts[0])
}
