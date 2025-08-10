import { Hono } from 'hono'
import { NextBusCard } from './components/NextBusCard'
import { getNextBusFromMalton, getNextBusToMalton } from './services/getNextBus'
import { getAppSettings } from '@/appSettings'
import { getDepartures } from './services/trainTimes'
import { TrainDeparturesList } from './components/TrainDeparturesList'
import { patchElement } from '@/lib/sseHelper'
import { streamWrapper } from '@/lib/streamWrapper'

const app = new Hono()

app.get('/bus', async (c) => {
    const travelSettings = getAppSettings().travel

    const updateBusTimes = async (stream: any) => {
        const now = new Date()
        const nextBusFrom = getNextBusFromMalton(now, travelSettings.townBusStop)
        const nextBusTo = getNextBusToMalton(now, travelSettings.homeBusStop)
        const htmlString = (<NextBusCard nextBusFrom={nextBusFrom} nextBusTo={nextBusTo} />).toString()
        await patchElement(stream, htmlString)
    }

    return await streamWrapper(c, updateBusTimes, 60000, 10)
})

app.get('/train/:code', async (c) => {
    const code = c.req.param('code').toUpperCase()
    const travelSettings = getAppSettings().travel

    const updateTrainDepartures = async (stream: any) => {
        const departures = await getDepartures(code, travelSettings.railApiKey)
        const htmlString = (<TrainDeparturesList departures={departures} />).toString()
        await patchElement(stream, htmlString)
    }

    return await streamWrapper(c, updateTrainDepartures, 60000, 10)
})

export default app
