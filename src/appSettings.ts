import { Variables } from '@fermyon/spin-sdk'
import { z } from 'zod'


const AppSettingsSchema = z.object({
    travel: z.object({
        homeBusStop: z.string().default('Barton le Street'),
        townBusStop: z.string().default('MALTON Bus Station'),
        railApiKey: z.string()
    }),
    weather: z.object({
        apiKey: z.string().optional(),
        metOfficeApiKey: z.string()
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
                    townBusStop: Variables.get('town_bus_stop'),
                    railApiKey: Variables.get('rail_api_key')
                },
                weather: {
                    apiKey: Variables.get('open_weather_api_key'),
                    metOfficeApiKey: Variables.get('met_office_api_key')
                },
                tide: {
                    location: Variables.get('tide_location')
                }
            })
        }
    }
    return appSettings
}
