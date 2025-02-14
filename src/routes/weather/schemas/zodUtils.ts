import { z } from 'zod'
import { toHourMinuteString } from '../../../lib/utils'

export const stringOrNumberToDate = z
  .string()
  .or(z.number())
  .transform((val) => new Date(val))
  .transform(toHourMinuteString)
  .optional()