import { z } from 'zod'
import { toHourMinuteString } from './dateUtils'

export const stringOrNumberToDate = z
  .string()
  .or(z.number())
  .transform((val) => new Date(val))
  .transform(toHourMinuteString)
  .optional()
  
export function degreesToCompass(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export function splitOnSemiColons(input: string): string[] {
  return input.split(';')
}

export function kmToMiles(km: number): number {
  const milesPerKm = 0.621
  return Math.round(km * milesPerKm)
}
