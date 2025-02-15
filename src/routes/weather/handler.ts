import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { oneHourInSeconds } from '../../config'
import { getTodayWeather } from './getWeather'
import { readFile } from '../../lib/readFile'
import { WeekAheadDay } from './schemas/Weather'
import { cacheWrapper } from '../../lib/cache'

export async function handleGetWeather(req: Request, res: ResponseBuilder) {
    console.log('getting weather')
    res.set('Cache-Control', `public, max-age=${oneHourInSeconds}`)
    res.set('Content-Type', 'text/html')

    const [template, weatherRecord] = await Promise.all([
        readFile('./templates/weather.sqrl'),
        cacheWrapper<WeekAheadDay>('weather', oneHourInSeconds, () => getTodayWeather()),
    ])

    res.send(Sqrl.render(template, { weatherRecord }))
}
