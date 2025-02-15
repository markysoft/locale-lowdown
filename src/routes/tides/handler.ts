import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getTides } from './getTides'
import { twelveHoursInSeconds } from '../../config'
import { readFile } from '../../lib/readFile'
import { TideRecord } from './schemas/Tide'
import { cacheWrapper } from '../../lib/cache'

export async function handleGetTides(req: Request, res: ResponseBuilder) {
    console.log('getting tides')
    res.set('Cache-Control', `public, max-age=${twelveHoursInSeconds}`)
    res.set('Content-Type', 'text/html')

    const [template, tideRecord] = await Promise.all([
        readFile('./templates/tides.sqrl'),
        cacheWrapper<TideRecord>('tides', twelveHoursInSeconds, () => getTides()),
    ])
    
    res.send(Sqrl.render(template, { tideRecord }))
}
