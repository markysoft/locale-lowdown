import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { getNextBusFromMalton, getNextBusToMalton } from './getNextBus'
import { departial } from '../../lib/departial'

export async function handleGetNextBus(req: Request, res: ResponseBuilder) {
    console.log('Getting next bus from Malton')
    res.set('Content-Type', 'text/html')

    const now = new Date()
    res.send(Sqrl.render(departial('next-bus'), {
        nextBus: {
            from: getNextBusFromMalton(now),
            to: getNextBusToMalton(now)
        }
    }))
}


