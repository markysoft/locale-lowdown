import { ResponseBuilder } from '@fermyon/spin-sdk'

export async function handleDefaultRoute(req: Request, res: ResponseBuilder): Promise<void> {
    res.set({ 'content-type': 'text/plain' })
    res.send('no such route, try another!')
}
