import { z } from 'zod'
import { dashDateStringToDate, toFriendlyDate } from '../../../lib/utils'

export const BankHolidaySchema = z.object({
    title: z.string(),
    date: z.string().transform(dashDateStringToDate),
    notes: z.string(),
    bunting: z.boolean()
}).transform((val) => {
    return {
        ...val,
        substituteDay: val.notes === 'Substitute day',
        dateString: toFriendlyDate(val.date)
    }
})

export type BankHoliday = z.infer<typeof BankHolidaySchema>