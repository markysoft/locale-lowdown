import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { isJsonRequest } from '../lib/isJsonRequest'
import { getBankHolidays } from '../lib/getBankHolidays'
import { twentyFourHoursInSeconds } from '../config'
import { readFile } from '../lib/readFile'

export async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {
    var template = await readFile('./templates/holiday-list.sqrl')
    console.log('getting bank holidays')
    const holidays = await getBankHolidays()
    res.set('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    if (isJsonRequest(req)) {
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(holidays))
    } else {
        res.set('Content-Type', 'text/plain')
        res.send(Sqrl.render(template, { holidays }))
    }
}
