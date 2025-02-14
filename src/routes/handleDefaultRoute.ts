import { ResponseBuilder } from '@fermyon/spin-sdk'

import fs from 'fs';

export async function handleDefaultRoute(req: Request, res: ResponseBuilder) {
    let x = fs.readFileSync('./templates/holiday-list.sqrl', 'utf8')
    res.set({ 'content-type': 'text/plain' })

    res.send('no such route, try another, ' + x)
}
