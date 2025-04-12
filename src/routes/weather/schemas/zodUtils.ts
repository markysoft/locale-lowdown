import { z } from 'zod'
import { applyBritishSummerTime, toHourMinuteString } from '../../../lib/utils'

export const stringOrNumberToDate = z
  .string()
  .or(z.number())
  .transform((val) => new Date(val))
  .transform(applyBritishSummerTime)
  .transform(toHourMinuteString)
  .optional()

