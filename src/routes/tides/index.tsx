import { Hono } from 'hono'
import { cacheWrapper } from '../../lib/cache'
import { TideRecord } from './schemas/Tide'
import { twelveHoursInSeconds } from '../../constants'
import { getTides } from './services/getTides'
import { TidesCard } from './components/TidesCard'
import { getAppSettings } from '../../appSettings'

const app = new Hono()

app.get('/', async (c) => {
    c.header('Cache-Control', `public, max-age=${twelveHoursInSeconds}`)
    const tideConfig = getAppSettings().tide
    const tideRecord = await cacheWrapper<TideRecord>('tide', twelveHoursInSeconds, () => getTides(tideConfig.location))
    return c.render(<TidesCard tideRecord={tideRecord} />)
})

export default app