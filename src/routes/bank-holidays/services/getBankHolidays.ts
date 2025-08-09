import { z } from 'zod'
import { getOneYearsTime } from '@/lib/utils'
import { BankHoliday, BankHolidaySchema } from '../schemas/BankHoliday'

export async function getBankHolidays() :Promise<BankHoliday[]> {

    const holidaysResponse = await fetch('https://www.gov.uk/bank-holidays.json')
    if (!holidaysResponse.ok) {
        throw new Error(`Failed to fetch bank holidays: ${holidaysResponse.statusText}`)
    }
    const {
        'england-and-wales': { events },

    } = await holidaysResponse.json()
 
    const now = new Date()
    const filter = (e: BankHoliday) => e.date > now && e.date < getOneYearsTime(now)

    return z.array(BankHolidaySchema).parse(events).filter(filter)
}
