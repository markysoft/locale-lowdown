import { z } from 'zod'
import { stringOrNumberToDate } from './zodUtils'
export const MoonSchema = z.object({
  phase: z.number().optional(),
  phaseDesc: z.string().optional(),
  angle: z.number().optional(),
  rise: stringOrNumberToDate,
  set: stringOrNumberToDate,
})


export type Moon = z.infer<typeof MoonSchema>