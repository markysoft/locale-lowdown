import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { oneHourInSeconds } from '../../config'
import { getTodayWeather, getWeekWeather as getWeatherForWeek } from './getWeather'
import { WeekAheadDay } from './schemas/Weather'
import { cacheWrapper } from '../../lib/cache'
import { departial } from '../../lib/departial'
import { readFile } from '../../lib/readFile'

export async function handleGetWeather(req: Request, res: ResponseBuilder) {
    console.log('getting weather')
    res.set('Cache-Control', `public, max-age=${oneHourInSeconds}`)
    res.set('Content-Type', 'text/html')
    const weatherRecord = await cacheWrapper<WeekAheadDay>('weather', oneHourInSeconds, () => getTodayWeather())
    res.send(Sqrl.render(departial('weather'), { weatherRecord }))
}

export async function handleGetWeekWeather(req: Request, res: ResponseBuilder) {
    console.log('getting weather for the week')
    res.set('Cache-Control', `public, max-age=${oneHourInSeconds}`)
    res.set('Content-Type', 'text/html')

    const [template, weekWeather] = await Promise.all([
        readFile('./templates/weather-week.sqrl'),
        cacheWrapper<WeekAheadDay[]>('week-weather', oneHourInSeconds, () => getWeatherForWeek()),
    ])

    res.send(Sqrl.render(template, { weekWeather }))
}
