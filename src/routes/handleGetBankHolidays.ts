import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getBankHolidays } from '../lib/getBankHolidays'
import { twentyFourHoursInSeconds } from '../config'
import { readFile } from '../lib/readFile'

export async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {
    console.log('getting bank holidays')
    res.set('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    res.set('Content-Type', 'text/plain')
    const template = await readFile('./templates/holiday-list.sqrl')
    res.send(Sqrl.render(template, { holidays: await getBankHolidays() }))
}
