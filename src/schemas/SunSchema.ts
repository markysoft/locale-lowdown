import { z } from 'zod'
import { stringOrNumberToDate } from '../lib/zodUtils'

export const TideSchema = z.object({
  time: z.string(),
  type: z.string(),
  height: z.number(),
})

export const SunSchema = z.object({
  rise: stringOrNumberToDate,
  set: stringOrNumberToDate,
  goldenHour: stringOrNumberToDate,
  goldenHourEnd: stringOrNumberToDate,
})
export type Sun = z.infer<typeof SunSchema>
