import { Hono } from 'hono'
import { cacheWrapper } from '../../lib/cache'
import { oneHourInSeconds } from '../../constants'
import { getTodayWeather, getWeekWeather } from './services/getOpenWeather'
import { WeekAheadDay } from './schemas/Weather'
import { WeatherCard } from './components/WeatherCard'
import { WeatherList } from './components/WeatherList'

const app = new Hono()

app.get('/today', async (c) => {
    c.header('Cache-Control', `public, max-age=${oneHourInSeconds}`)
    const weekAheadDay = await cacheWrapper<WeekAheadDay>('weather-day', oneHourInSeconds, () => getTodayWeather())
    return c.render(<WeatherCard weekAheadDay={weekAheadDay} />)
})

app.get('/week-ahead', async (c) => {
    c.header('Cache-Control', `public, max-age=${oneHourInSeconds}`)
    const weekAhead = await cacheWrapper<WeekAheadDay[]>('weather-week', oneHourInSeconds, () => getWeekWeather())
    return c.render(<WeatherList weekAhead={weekAhead} />)
})

export default app
