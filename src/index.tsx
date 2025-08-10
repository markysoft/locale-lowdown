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
import { TrainDeparturesList } from './routes/travel/components/TrainDeparturesList'
import { getAppSettings } from './appSettings'
import { getDepartures } from './routes/travel/services/trainTimes'

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

  const code = c.req.param('code')?.toUpperCase() || 'MLT'
  const travelSettings = getAppSettings().travel
  console.log('SSE connection established')
  return stream(c, async (stream) => {
    let isAborted = false

    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!')
      isAborted = true
    })

    let counter = 0
    while (!isAborted && counter < 10) {

      if (!isAborted) {
        counter++
        const departures = await getDepartures(code, travelSettings.railApiKey)
        const htmlString = (<TrainDeparturesList departures={departures} />).toString()
        await patchElement(stream, htmlString)
      }
      await new Promise(resolve => setTimeout(resolve, 60000)) // Sleep for 1 second
    }
  })
})

app.get('/sse2', async (c) => {
  console.log('SSE connection established')
  return stream(c, async (stream) => {
    let isAborted = false

    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!')
      isAborted = true
    })

    // Keep sending updates every 1 second while stream is open (max 10 times)
    let counter = 0
    while (!isAborted && counter < 10) {

      if (!isAborted) {
        counter++
        const timestamp = new Date().toLocaleTimeString()
        await patchElement(stream, `<div id="foo">Updated at ${timestamp} (${counter}/10)</div>`)
      }
      await new Promise(resolve => setTimeout(resolve, 1000)) // Sleep for 1 second
    }
  })
})
