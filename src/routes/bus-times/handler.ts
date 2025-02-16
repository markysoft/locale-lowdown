import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { readFile } from '../../lib/readFile'
import { getNextBusFromMalton, getNextBusToMalton } from './getNextBus'

export async function handleGetNextBusToMalton(req: Request, res: ResponseBuilder) {
    console.log('Getting next bus to Malton')
    res.set('Content-Type', 'text/html')

    const template = await readFile('./templates/next-bus.sqrl')
    const nextBusToMalton = getNextBusToMalton(new Date())

    res.send(Sqrl.render(template, {
        nextBus: {
            title: 'Next bus to Malton',
            message: nextBusToMalton
        }
    }))
}

export async function handleGetNextBusFromMalton(req: Request, res: ResponseBuilder) {
    console.log('Getting next bus from Malton')
    res.set('Content-Type', 'text/html')

    const template = await readFile('./templates/next-bus.sqrl')
    const nextBusFromMalton = getNextBusFromMalton(new Date())

    res.send(Sqrl.render(template, {
        nextBus: {
            title: 'Next bus from Malton',
            message: nextBusFromMalton
        }
    }))
}

