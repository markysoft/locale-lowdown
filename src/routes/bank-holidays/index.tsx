import { Hono } from 'hono'
import { getBankHolidays } from './services/getBankHolidays'
import { twentyFourHoursInSeconds } from '../../constants'
import { BankHolidayCard } from './components/BankHolidayCard'
import { BankHolidayList } from './components/BankHolidayList'
import { cacheWrapper } from '../../lib/cache'
import { BankHoliday } from './schemas/BankHoliday'

const app = new Hono()

app.get('/next', async (c) => {
    c.header('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)

    const holidays = await cacheWrapper<BankHoliday[]>('bank-holidays', twentyFourHoursInSeconds, () => getBankHolidays())
    const nextHoliday = holidays[0]
    return c.render(<BankHolidayCard bankHoliday={nextHoliday}  />)
})

app.get('/upcoming', async (c) => {
    c.header('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    const holidays = await cacheWrapper<BankHoliday[]>('bank-holidays', twentyFourHoursInSeconds, () => getBankHolidays())
    return c.render(<BankHolidayList bankHolidays={holidays} />)
})

export default app