export function isJsonRequest(req: Request) {
    return req.headers.get('Content-Type') === 'application/json'
}
