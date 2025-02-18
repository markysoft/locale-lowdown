import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => c.json( {status : 'ok'}))

export default app