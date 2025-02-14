import { ResponseBuilder, Router } from "@fermyon/spin-sdk";
import { handleGetBankHolidays } from './routes/handleGetBankHolidays'
import { handleError } from "./lib/handleError";
import { handleDefaultRoute } from "./routes/handleDefaultRoute";
import { readFileStream } from "./lib/readFile";
import { handleGetTides } from "./routes/handleGetTides";
import { handleGetWeather } from "./routes/handleGetWeather";

const router = Router()

router.get(
    '/',
    async (_, req: Request, res: ResponseBuilder) => { 
        res.send(await readFileStream('./index.html'));
     })

router.get(
    '/site.css',
    async (_, req: Request, res: ResponseBuilder) => { 
        res.set('Content-Type', 'text/css')
        res.send(await readFileStream('./site.css'));
     })

router.get(
    '/api/bank-holidays',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetBankHolidays(req, res) })

router.get(
    '/api/tides',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetTides(req, res) })

router.get(
    '/api/weather',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetWeather(req, res) })


router.all('*', (_, req, res) => { handleDefaultRoute(req, res) })
    
export async function handler(req: Request, res: ResponseBuilder) {
    try {
        await router.handleRequest(req, res)
    }
    catch (error: unknown) {
        console.error(error)
        handleError(res, error)
    }
}
