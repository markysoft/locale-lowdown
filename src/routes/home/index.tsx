import { Hono } from 'hono'
import { Layout } from './components/Layout'

const app = new Hono()

app.get('/', (c) => {
    return c.render(<Layout />)
})

app.get('/site.js', (c) => {
    c.header('Content-Type', 'application/javascript')
    // todo - replace this with a file read by adding the fs shim
    return c.body(`
        document.addEventListener('htmx:sendError', function (event) {
            document.querySelector('.error-message').style.display = 'block'
        });
    `)
})

export default app