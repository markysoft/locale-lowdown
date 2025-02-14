import { z } from 'zod'
import { SunSchema } from './SunSchema'
import { MoonSchema } from './Moon'
import { degreesToCompass, kmToMiles, splitOnSemiColons } from '../lib/zodUtils'

export const WeatherSchema = z.object({
  date: z.date().optional(),
  main: z.string().optional(),
  description: z.string().transform(splitOnSemiColons).optional(),
  chanceOfRain: z.number().transform((val) => `${val * 100}%`).optional(),
  temp: z.object({
    max: z.number().optional(),
    min: z.number().optional(),
    day: z.number().optional(),
    night: z.number().optional(),
  }),
  wind: z.object({
    speed: z.number().transform(kmToMiles).optional(),
    maxSpeed: z.number().transform(kmToMiles).optional(),
    degrees: z.number().transform(degreesToCompass).optional(),
  }),
})

export type Weather = z.infer<typeof WeatherSchema>

export const WeekAheadDaySchema = z.object({
  weather: WeatherSchema,
  sun: SunSchema,
  moon: MoonSchema,
})

export type WeekAheadDay = z.infer<typeof WeekAheadDaySchema>
