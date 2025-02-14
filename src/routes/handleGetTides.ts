import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getTides } from '../lib/getTides'
import { twelveHoursInSeconds } from '../config'
import { readFile } from '../lib/readFile'

export async function handleGetTides(req: Request, res: ResponseBuilder) {
    console.log('getting tides')
    res.set('Cache-Control', `public, max-age=${twelveHoursInSeconds}`)
    res.set('Content-Type', 'text/html')
    var template = await readFile('./templates/tides.sqrl')
    res.send(Sqrl.render(template, { tideRecord: await getTides() }))    
}
