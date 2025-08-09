import { Hono } from 'hono'
import { stream, streamSSE } from 'hono/streaming'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { jsxRenderer } from 'hono/jsx-renderer'
import healthz from './routes/healthz'
import home from './routes/home'
import bankHolidays from './routes/bank-holidays'
import travel from './routes/travel'
import tides from './routes/tides'
import weather from './routes/weather'
import bins from './routes/bins'
import { ErrorArticle } from './routes/home/components/ErrorArticle'
import { patchElement, patchTag } from './lib/sseHelper'

console.log('Starting...')
const app = new Hono()

app.use(logger())
app.use(timing())
app.use('*', jsxRenderer(({ children }) => <html>{children}</html>, { docType: true }))

app.get('/favicon.ico', (c) => c.body(null, 204))
app.route('/', home)
app.route('/healthz', healthz)
app.route('/bank-holidays', bankHolidays)
app.route('/travel', travel)
app.route('/tides', tides)
app.route('/weather', weather)
app.route('/bins', bins)

app.notFound((c) => c.text('No such route, try another!', 404))

app.onError((err, c) => {
  console.error(`${err}`)
  const message = err instanceof Error ? err.message : JSON.stringify(err)
  return c.render(<ErrorArticle message={message} />)
})
//@ts-expect-error fetch is not defined
addEventListener('fetch', async (event: FetchEvent) => {
  event.respondWith(app.fetch(event.request))
})

let id = 0

app.get('/sse', async (c) => {
  console.log('SSE connection established')
    return stream(c, async (stream) => {
    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!')
    })
    await patchElement(stream, '<div id="foo">Hello world!</div>')
    await patchTag(stream, 'title', '08:30:36')
  })
})
