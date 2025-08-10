import { Hono } from 'hono'
import { NextBusCard } from './components/NextBusCard'
import { getNextBusFromMalton, getNextBusToMalton } from './services/getNextBus'
import { getAppSettings } from '@/appSettings'
import { Departures, getDepartures } from './services/trainTimes'
import { TrainDeparturesList } from './components/TrainDeparturesList'
import { patchElement } from '@/lib/sseHelper'
import { streamWrapper } from '@/lib/streamWrapper'
import { oneMinuteInSeconds } from '@/constants'
import { cacheWrapper } from '@/lib/cache'

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

    return await streamWrapper(c, updateBusTimes, oneMinuteInSeconds, 120)
})

app.get('/train/:code', async (c) => {
    const code = c.req.param('code').toUpperCase()
    const travelSettings = getAppSettings().travel

    const updateTrainDepartures = async (stream: any) => {
        const departures = await cacheWrapper<Departures>(`train-${code}`, oneMinuteInSeconds, () => getDepartures(code, travelSettings.railApiKey))
        const htmlString = (<TrainDeparturesList departures={departures} />).toString()
        await patchElement(stream, htmlString)
    }

    return await streamWrapper(c, updateTrainDepartures, oneMinuteInSeconds, 120)
})

export default app
