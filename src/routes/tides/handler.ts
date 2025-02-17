import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getTides } from './getTides'
import { twelveHoursInSeconds } from '../../constants'
import { TideRecord } from './schemas/Tide'
import { cacheWrapper } from '../../lib/cache'
import { departial } from '../../lib/departial'

export async function handleGetTides(req: Request, res: ResponseBuilder): Promise<void> {
    console.log('getting tides')
    res.set('Cache-Control', `public, max-age=${twelveHoursInSeconds}`)
    res.set('Content-Type', 'text/html')

    const tideRecord = await cacheWrapper<TideRecord>('tides', twelveHoursInSeconds, () => getTides())
    res.send(Sqrl.render(departial('tides'), { tideRecord }))
}
