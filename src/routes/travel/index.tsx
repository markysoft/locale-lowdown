import { Hono } from 'hono'
import { NextBusCard } from './components/NextBusCard'
import { getNextBusFromMalton, getNextBusToMalton } from './services/getNextBus'
import { getAppSettings } from '../../appSettings'
import { getDepartures } from './services/trainTimes'
import { TrainDeparturesList } from './components/TrainDeparturesList'

const app = new Hono()

app.get('/bus', (c) => {
    const travelSettings = getAppSettings().travel
    const now = new Date()
    return c.render(<NextBusCard
        nextBusFrom={getNextBusFromMalton(now, travelSettings.townBusStop)}
        nextBusTo={getNextBusToMalton(now, travelSettings.homeBusStop)
        } />)
})
app.get('/train', async (c) => {
    const travelSettings = getAppSettings().travel
    const departures = await getDepartures('MLT', travelSettings.railApiKey)
    return c.render(<TrainDeparturesList departures={departures} />)
})

export default app