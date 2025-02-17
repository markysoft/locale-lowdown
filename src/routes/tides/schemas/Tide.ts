import { z } from 'zod'
import { toFriendlyDate } from '../../../lib/utils'

export const TideSchema = z.object({
    time: z.string(),
    type: z.enum(['High', 'Low']),
    height: z.preprocess((val) => Number(val), z.number())
})

export const TideRecordSchema = z.object({
    location: z.string(),
    date: z.date().transform(toFriendlyDate),
    tides: z.array(TideSchema).optional().default([]),
})

export type Tide = z.infer<typeof TideSchema>
export type TideRecord = z.infer<typeof TideRecordSchema>