import { Hono } from 'hono'
import { NextBusCard } from './components/NextBusCard'
import { getNextBusFromMalton, getNextBusToMalton } from './services/getNextBus'
import { getAppSettings } from '../../appSettings'

const app = new Hono()

app.get('/bus', (c) => {
    const travelSettings = getAppSettings().travel
    const now = new Date()
    return c.render(<NextBusCard
        nextBusFrom={getNextBusFromMalton(now, travelSettings.TownBusStop)}
        nextBusTo={getNextBusToMalton(now, travelSettings.homeBusStop)
        } />)
})

export default app