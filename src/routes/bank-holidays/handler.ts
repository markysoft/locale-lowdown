import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getBankHolidays } from './getBankHolidays'
import { twentyFourHoursInSeconds } from '../../config'
import { readFile } from '../../lib/readFile'
import { cacheWrapper } from '../../lib/cache'
import { BankHoliday } from './schemas/BankHoliday'
import { departial } from '../../lib/departial'

export async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {
    console.log('getting bank holidays')
    res.set('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    res.set('Content-Type', 'text/html')


    const [template, holidays] = await Promise.all([
        readFile('./templates/holiday-list.sqrl'),
        cacheWrapper<BankHoliday[]>('bank-holidays', twentyFourHoursInSeconds, () => getBankHolidays())
    ])

    res.send(Sqrl.render(template, { holidays }))
}

export async function handleGetNextBankHoliday(req: Request, res: ResponseBuilder) {
    console.log('getting next bank holiday')
    res.set('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    res.set('Content-Type', 'text/html')

    const holidays = await cacheWrapper<BankHoliday[]>(
        'bank-holidays',
        twentyFourHoursInSeconds,
        () => getBankHolidays()
    )

    res.send(Sqrl.render(departial('bank-holiday'), { holiday: holidays[0] }))
}
