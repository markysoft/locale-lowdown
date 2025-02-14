import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getTides } from '../lib/getTides'
import { tideTemplate } from '../templates/tides'
import { twelveHoursInSeconds } from '../config'

export async function handleGetTides(req: Request, res: ResponseBuilder) {
    console.log('getting tides')
    const tideRecord = await getTides()
    res.set('Cache-Control', `public, max-age=${twelveHoursInSeconds}`)

    res.set('Content-Type', 'text/html')
    res.send(Sqrl.render(tideTemplate, { tideRecord }))

}
