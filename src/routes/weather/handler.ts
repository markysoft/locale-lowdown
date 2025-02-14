import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { oneHourInSeconds } from '../../config'
import { getTodayWeather } from './getWeather'
import { readFile } from '../../lib/readFile'

export async function handleGetWeather(req: Request, res: ResponseBuilder) {
    console.log('getting weather')
    res.set('Cache-Control', `public, max-age=${oneHourInSeconds}`)
    res.set('Content-Type', 'text/html')
    const template = await readFile('./templates/weather.sqrl')
    res.send(Sqrl.render(template, { weatherRecord: await getTodayWeather() }))
}
