/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This file is a wrapper around the actual handler function defined in `index.ts` and attaches it to
 * the fetchEvent. If you prefer to directly target the fetchEvent, you can
 * modify this file.
 */

// This file is a wrapper around the actual handler function defined in `index.ts` and attaches it to
// the fetchEvent. If you prefer to directly target the fetchEvent, you can
// modify this file

import { ResponseBuilder } from '@fermyon/spin-sdk'
import { handler } from '.'

//@ts-expect-error FetchEvent type might not be recognized in some environments
addEventListener('fetch', (event: FetchEvent) => {
    handleEvent(event)
})

async function handleEvent(event: FetchEvent) {

    let resolve: any, reject: any
    const responsePromise = new Promise((res, rej) => {
        resolve = res
        reject = rej
    })
    //@ts-expect-error might not respone 
    event.respondWith(responsePromise)

    const res = new ResponseBuilder(resolve)

    try {
        // In case you want to do some work after the response is sent
        // uncomment the line below and comment out the line with 
        // await handler(event.request, res)
        // event.waitUntil(handler(event.request, res))
        await handler(event.request, res)
    } catch (e: any) {
        if (res.getStatus() == 200) {
            res.status(500)
        }
        res.send(`error in handler: ${e}`)
    }
}