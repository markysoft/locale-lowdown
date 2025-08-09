import { getAppSettings } from '@/appSettings'
import { MoonSchema } from '../schemas/Moon'
import { OpenWeather } from '../schemas/OpenWeather'
import { SunSchema } from '../schemas/SunSchema'
import { WeatherSchema, WeekAheadDay } from '../schemas/Weather'

function mapWeather(todayWeather: OpenWeather): WeekAheadDay {
  const {
    temp,
    dt: date,
    summary: description,
    wind_speed: speed,
    wind_gust: maxSpeed,
    wind_deg: degrees,
    weather: [weather],
    pop: chanceOfRain,
    sunrise,
    sunset,
    moonrise,
    moonset,
    moon_phase,
  } = todayWeather

  const { main } = weather
  return {
    weather: WeatherSchema.parse({
      date: new Date(date * 1000),
      main,
      description,
      chanceOfRain,
      temp,
      wind: { speed, maxSpeed, degrees },
    }),
    sun: SunSchema.parse({ rise: sunrise * 1000, set: sunset * 1000 }),
    moon: MoonSchema.parse({ rise: moonrise * 1000, set: moonset * 1000, phase: moon_phase }),
  }
}

 function getUrl(): string {
  const weatherConfig = getAppSettings().weather
  const lat = 54.16
  const long = -0.89
  const exclude = 'current,minutely,hourly'
  const units = 'metric'
  return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${weatherConfig.apiKey}&units=${units}`
}

async function callWeatherApi(): Promise<OpenWeather[]> {
  const response = await fetch(getUrl())
  const data = await response.json()
  return data.daily
}

export async function getTodayWeather(): Promise<WeekAheadDay> {
  const daily = await callWeatherApi()
  return mapWeather(daily[0])
}

export async function getWeekWeather(): Promise<WeekAheadDay[]> {
  const daily = await callWeatherApi()
  return daily.map(mapWeather)
}
