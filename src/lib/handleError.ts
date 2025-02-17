import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { readFile } from './readFile'

export async function handleError(res: ResponseBuilder, error: unknown) : Promise<void> {
    res.set('Content-Type', 'application/json')
    res.statusCode = 500
    const template = await readFile('./templates/error.sqrl')
    if (error instanceof Error) {
        res.send(Sqrl.render(template, { message: error.message }))
    }
    else {
        res.send(Sqrl.render(template, { message: JSON.stringify(error) }))
    }
}
