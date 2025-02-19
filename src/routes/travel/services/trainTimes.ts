import { z } from 'zod'
import { toHourMinuteString } from '../../../lib/utils'

export const DepartureSchema = z.object({
    futureCancellation: z.boolean(),
    futureDelay: z.boolean(),
    origin: z.array(
        z.object({
            locationName: z.string(),
            crs: z.string(),
            assocIsCancelled: z.boolean()
        })
    ),
    destination: z.array(
        z.object({
            locationName: z.string(),
            crs: z.string(),
            assocIsCancelled: z.boolean()
        })
    ),
    std: z.string(),
    etd: z.string(),
    platform: z.string(),
    operator: z.string(),
    isCancelled: z.boolean(),
    isReverseFormation: z.boolean(),
    serviceID: z.string()
}).transform((departure) => {
    return {
        origin: departure.origin[0].locationName,
        destination: departure.destination[0].locationName,
        standardTime: departure.std,
        expected: departure.etd,
        platform: departure.platform,
        operator: departure.operator,
        isCancelled: departure.isCancelled,
        isReverseFormation: departure.isReverseFormation,
    }
})

export const DeparturesSchema = z.object({
    trainServices: z.array(DepartureSchema),
    generatedAt: z.coerce.date().transform((date) => toHourMinuteString(date)),
    locationName: z.string(),
    crs: z.string(),
    filterType: z.string(),
    platformAvailable: z.boolean(),
    areServicesAvailable: z.boolean()
})

export type Departure = z.infer<typeof DepartureSchema>
export type Departures = z.infer<typeof DeparturesSchema>

export async function getDepartures(stationCode: string, apiKey: string): Promise<Departures> {
    const result = await fetch(`https://api1.raildata.org.uk/1010-live-departure-board-dep1_2/LDBWS/api/20220120/GetDepartureBoard/${stationCode}`, {
        headers: {
            'x-apikey': apiKey,
        },
    })
    const json = await result.json()
    console.log(json)
    const data = DeparturesSchema.parse(json)
    return data
}
