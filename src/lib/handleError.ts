import { ResponseBuilder } from '@fermyon/spin-sdk'

export function handleError(res: ResponseBuilder, error: unknown) {
    res.set('Content-Type', 'application/json')
    res.statusCode = 500
    if (error instanceof Error) {
        res.send(JSON.stringify({ error: error.message }))
    } else {
        res.send(JSON.stringify(error))
    }
}
