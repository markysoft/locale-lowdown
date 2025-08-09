import { z } from 'zod'

export const MetOfficeTimeSeriesSchema = z.object({
  time: z.string(),
  midday10MWindSpeed: z.number(),
  midnight10MWindSpeed: z.number(),
  midday10MWindDirection: z.number(),
  midnight10MWindDirection: z.number(),
  midday10MWindGust: z.number(),
  midnight10MWindGust: z.number(),
  middayVisibility: z.number(),
  midnightVisibility: z.number(),
  middayRelativeHumidity: z.number(),
  midnightRelativeHumidity: z.number(),
  middayMslp: z.number(),
  midnightMslp: z.number(),
  nightSignificantWeatherCode: z.number(),
  dayMaxScreenTemperature: z.number(),
  nightMinScreenTemperature: z.number(),
  dayUpperBoundMaxTemp: z.number(),
  nightUpperBoundMinTemp: z.number(),
  dayLowerBoundMaxTemp: z.number(),
  nightLowerBoundMinTemp: z.number(),
  nightMinFeelsLikeTemp: z.number(),
  dayUpperBoundMaxFeelsLikeTemp: z.number(),
  nightUpperBoundMinFeelsLikeTemp: z.number(),
  dayLowerBoundMaxFeelsLikeTemp: z.number(),
  nightLowerBoundMinFeelsLikeTemp: z.number(),
  nightProbabilityOfPrecipitation: z.number(),
  nightProbabilityOfSnow: z.number(),
  nightProbabilityOfHeavySnow: z.number(),
  nightProbabilityOfRain: z.number(),
  nightProbabilityOfHeavyRain: z.number(),
  nightProbabilityOfHail: z.number(),
  nightProbabilityOfSferics: z.number(),
})

export const MetOfficeWeatherSchema = z.object({
  requestPointDistance: z.number(),
  modelRunDate: z.string(),
  timeSeries: z.array(MetOfficeTimeSeriesSchema),
})

export type MetOfficeTimeSeries = z.infer<typeof MetOfficeTimeSeriesSchema>
export type MetOfficeWeather = z.infer<typeof MetOfficeWeatherSchema>
