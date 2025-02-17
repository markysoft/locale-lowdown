import { ResponseBuilder, Router } from '@fermyon/spin-sdk'
import { handleGetBankHolidays, handleGetNextBankHoliday } from './routes/bank-holidays/handler'
import { handleError } from './lib/handleError'
import { handleDefaultRoute } from './routes/default/handler'
import { readFileStream } from './lib/readFile'
import { handleGetTides } from './routes/tides/handler'
import { handleGetWeather, handleGetWeekWeather } from './routes/weather/handler'
import { handleGetNextBus } from './routes/bus-times/handler'
import { addPartial } from './lib/addPartial'

let templatesLoaded = false
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

async function loadTemplates(): Promise<void> {
    // can only use file functions after webpack intiialisation, so lazy load it
    if (!templatesLoaded) {
        const templates = ['bank-holiday', 'holiday-list', 'weather', 'weather-week', 'tides', 'next-bus']
        await Promise.all(templates.map(addPartial))
        templatesLoaded = true
    }
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
