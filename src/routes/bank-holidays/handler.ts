import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getBankHolidays } from './getBankHolidays'
import { twentyFourHoursInSeconds } from '../../config'
import { readFile } from '../../lib/readFile'
import { cacheWrapper } from '../../lib/cache'
import { BankHoliday } from './schemas/BankHoliday'

let templateLoaded = false

async function loadTemplate(): Promise<boolean> {
    if (!templateLoaded) {
        const template = await readFile('./templates/bank-holiday.sqrl')
        Sqrl.templates.define('bank-holiday', Sqrl.compile(template))
        templateLoaded = true
    }
    return true
}

export async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {
    console.log('getting bank holidays')
    res.set('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    res.set('Content-Type', 'text/plain')


    const [template, holidays] = await Promise.all([
        readFile('./templates/holiday-list.sqrl'),
        cacheWrapper<BankHoliday[]>('bank-holidays', twentyFourHoursInSeconds, () => getBankHolidays()),
        loadTemplate()
    ])

    res.send(Sqrl.render(template, { holidays }))
}



export async function handleGetNextBankHoliday(req: Request, res: ResponseBuilder) {
    console.log('getting next bank holiday')
    res.set('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    res.set('Content-Type', 'text/plain')

    const [template, holidays] = await Promise.all([
        readFile('./templates/bank-holiday.sqrl'),
        cacheWrapper<BankHoliday[]>('bank-holidays', twentyFourHoursInSeconds, () => getBankHolidays()),
        loadTemplate()
    ])

    res.send(Sqrl.render(template, { holiday: holidays[0] }))
}
