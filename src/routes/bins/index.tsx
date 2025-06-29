import { Hono } from 'hono'
import { getNextFourBinDays } from './services/getNextBinDays'
import { BinsCard } from './components/BinsCard'

const app = new Hono()

app.get('/', async (c) => {
    const nextBins = getNextFourBinDays(new Date())
    return c.render(<BinsCard nextBins={nextBins} />)
})

export default app