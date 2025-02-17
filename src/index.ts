import { ResponseBuilder, Router } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { handleGetBankHolidays, handleGetNextBankHoliday } from './routes/bank-holidays/handler'
import { handleError } from './lib/handleError'
import { handleDefaultRoute } from './routes/default/handler'
import { readFile, readFileStream } from './lib/readFile'
import { handleGetTides } from './routes/tides/handler'
import { handleGetWeather, handleGetWeekWeather } from './routes/weather/handler'
import { handleGetNextBus } from './routes/bus-times/handler'


let templateLoaded = false
const router = Router()

router.get(
    '/',
    async (_, req: Request, res: ResponseBuilder) => {
        res.set('Content-Type', 'text/html')
        res.send(await readFileStream('./index.html'))
    })

router.get(
    '/site.css',
    async (_, req: Request, res: ResponseBuilder) => {
        res.set('Content-Type', 'text/css')
        res.send(await readFileStream('./site.css'))
    })

router.get(
    '/api/bank-holidays',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetBankHolidays(req, res) })
    
router.get(
    '/api/next-bank-holiday',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetNextBankHoliday(req, res) })

router.get(
    '/api/tides',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetTides(req, res) })

router.get(
    '/api/weather',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetWeather(req, res) })

router.get(
    '/api/weather-week',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetWeekWeather(req, res) })

router.get(
    '/api/next-bus',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetNextBus(req, res) })


router.all('*', (_, req, res) => { handleDefaultRoute(req, res) })


async function loadTemplates(): Promise<boolean> {
    // can only use file functions after webpack intiialisation, so lazy load it
    if (!templateLoaded) {
        const bankHolidayTemplate = await readFile('./templates/bank-holiday.sqrl')
        Sqrl.templates.define('bank-holiday', Sqrl.compile(bankHolidayTemplate))
        const weatherTemplate = await readFile('./templates/weather.sqrl')
        Sqrl.templates.define('weather', Sqrl.compile(weatherTemplate))
        const tidesTemplate = await readFile('./templates/tides.sqrl')
        Sqrl.templates.define('tides', Sqrl.compile(tidesTemplate))
        const nextBusTemplate = await readFile('./templates/next-bus.sqrl')
        Sqrl.templates.define('next-bus', Sqrl.compile(nextBusTemplate))
        templateLoaded = true
    }
    return true
}


export async function handler(req: Request, res: ResponseBuilder) {
    await loadTemplates()
    try {
        await router.handleRequest(req, res)
    }
    catch (error: unknown) {
        console.error(error)
        handleError(res, error)
    }
}

