import { z } from 'zod'
import { SunSchema } from './SunSchema'
import { MoonSchema } from './Moon'
import { degreesToCompass, getDayOfWeek as toDayOfWeek, splitOnSemiColons } from '@/lib/utils'

export const WeatherSchema = z.object({
  date: z.date().optional().transform((val) => val ? toDayOfWeek(val) : undefined),
  main: z.string().optional(),
  description: z.string().transform(splitOnSemiColons).optional(),
  chanceOfRain: z.number().transform((val) => `${Math.round(val * 100)}%`).optional(),
  temp: z.object({
    max: z.number().transform(Math.round).optional(),
    min: z.number().transform(Math.round).optional(),
    day: z.number().transform(Math.round).optional(),
    night: z.number().transform(Math.round).optional(),
  }),
  wind: z.object({
    speed: z.number().optional(),
    maxSpeed: z.number().optional(),
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
