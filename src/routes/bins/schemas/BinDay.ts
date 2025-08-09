import { z } from 'zod'

export const BinDaySchema = z.object({
  date: z.date(),
  type: z.enum(['rubbish', 'red bin', 'blue bin']),
  description: z.string(),
})

export type BinDay = z.infer<typeof BinDaySchema>
