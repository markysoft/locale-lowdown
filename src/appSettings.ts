import { Variables } from '@fermyon/spin-sdk'
import { z } from 'zod'


const AppSettingsSchema = z.object({
    travel: z.object({
        homeBusStop: z.string().default('Barton le Street'),
        TownBusStop: z.string().default('MALTON Bus Station')
    }),
    weather: z.object({
        apiKey: z.string().optional(),
        locationKey: z.string().default('54400_PC')
    }),
    tide: z.object({
        location: z.string().default('whitby')
    })
})

export type AppSettings = z.infer<typeof AppSettingsSchema>


let appSettings: AppSettings | undefined

export function getAppSettings(): AppSettings {
    if (appSettings === undefined) {
        {
            appSettings = AppSettingsSchema.parse({
                travel: {
                    homeBusStop: Variables.get('home_bus_stop'),
                    TownBusStop: Variables.get('town_bus_stop')
                },
                weather: {
                    apiKey: Variables.get('weather_api_key'),
                    locationKey: Variables.get('weather_location_key')
                },
                tide: {
                    location: Variables.get('tide_location')
                }
            })
        }
    }
    return appSettings
}