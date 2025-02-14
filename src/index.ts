import { ResponseBuilder, Router } from "@fermyon/spin-sdk";
import fs from 'fs';

import { handleGetBankHolidays } from './routes/handleGetBankHolidays'
import { handleError } from "./lib/handleError";
import { handleDefaultRoute } from "./routes/handleDefaultRoute";

const router = Router()


router.get(
    '/',
    async (_, req: Request, res: ResponseBuilder) => { 
        const index = fs.readFileSync('./index.html', 'utf8');
        res.send(index);
     })

router.get(
    '/site.css',
    async (_, req: Request, res: ResponseBuilder) => { 
        const index = fs.readFileSync('./site.css', 'utf8');
        res.send(index);
     })

router.get(
    '/api/bank-holidays',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetBankHolidays(req, res) })

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
