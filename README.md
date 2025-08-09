# Locale Lowdown

Application to explore Spin, Hono and DataStar

## Overview

It's a convenient site to show me the current weather, when my next bus is and so on. Of limited use to people that don't live where I do. See it running [here](https://barton-lowdown.fermyon.app/).

## Running locally

If you do want to see it running locally, you'll need to obtain Raildata and AccuWeather API keys, and set them in enviroment variables `SPIN_VARIABLE_RAIL_API_KEY` and `SPIN_VARIABLE_WEATHER_API_KEY` respectively.

Other than that, install [Spin](https://developer.fermyon.com/spin/v3/index) as per the docs, then run: 
```
npm install
npm run dev
```
or 
```
spin watch
spin deploy
```

## Front End

The front end is developed in [DataStar](https://www.data-star.dev). Not everything needs to be a Single Page Appliction calling a JSON API!

It's pretty much just a single static web page, where various parts are replaced with a call to the backend upon load, using this pattern:

```html
 <div hx-get="/api/some-route" hx-trigger="load">
    some content that will be displayed until the section loads
</div>
```
[Bulma](https://bulma.io/) css is used, and automatically detects dark mode, which is nice!

## Back End

The back end uses [Spin](https://developer.fermyon.com/spin/v3/index) which is essentially Typescript compiled to WebAssembly. It's super fast to spin up, is a small deployment, and you can currently host up to 5 apps for free.

Being WASM, the full server side Node.js experience is not available, so package support is limited. This means you may need to be creative in how you approach things as you can't rely on the usual NPM packages.

Initially the project used [Squirrelly](https://squirrelly.js.org/docs/), which can be seen on this [branch](https://github.com/markysoft/locale-lowdown/tree/squirrelly).

It has now moved to [Hono](https://hono.dev). Hono has a number of advantages, the primary one being it supports rendering JSX templates. This is awesome, as I don't need to use the Spin static file server as I'm only serving JSX files, and all styles and icons comes from a CDN.

Adding Hono to Spin was surprisingly straight forward, pretty much just this:

```javascript
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/jsx', (c) => {
  return c.html(<h1>Hello Hono!</h1>)
})

addEventListener('fetch', async (event: FetchEvent) => {
    event.respondWith(app.fetch(event.request));
});

```
This will need the `index.js` changing to `index.jsx` and a few other tweaks you can see in the [tsconfig.json](./tsconfig.json) and other places to enure `index.jsx` is used rather than `index.js`. 

Regarding the project structure, as each route is a new Hono App mapped to a URL as suggested [here](https://hono.dev/docs/guides/best-practices#building-a-larger-application), the route folders contain all the services, schemas, and components required by the HTML fragment returned by the API. It could even be split out to micro-frontends if so desired.


## Testing

Testing is challenging, there are ways of [integration testing Spin applications](https://developer.fermyon.com/spin/v3/testing-apps#testing-applications) by calling the compiled WebAssembly directly, but I wanted some unit tests.

I settled on using the standard node [Test runner](https://nodejs.org/api/test.html). It's good enough for testing business logic, but as it's a different environment than WebAssembly it's not 100% like-for-like - so you might run into the odd edge case.

The test folders sit outside the src folder so they don't get picked up during the wasm build.

## Other Notes

I had issues with an RSS parsing library due to dependencies, so had to resort to parsing the html directly, though it works OK in the [AI News Feeder project](https://github.com/fermyon/ai-examples/blob/main/newsfeeder-ts).

Spin cloud comes with a handy key vault store, which I use to cache weather requests etc, as the free tier of Accuweather only allows 50 calls a day.
## Summary

Spin + Hono + DataStar makes for an awesome [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) web site that is responsive, has super quick start up times, and allows the use of powerful JSX templates.

There are limits to the amount of standard Node.js libraries supported, but for a simple site that calls other APIs it's fantastic! I look forward to the future of WebAssembly and [Spin](https://developer.fermyon.com/spin/v3/index).

## External Resources

Tide times from [www.tidetimes.org.uk](https://www.tidetimes.org.uk), weather from [www.openweathermap.org](https://www.openweathermap.org), train times from [ raildata.org.uk/](https://raildata.org.uk), and bank holidays from [www.gov.uk](http://www.gov.uk/bank-holidays). 

The [json-to-zod](https://transform.tools/json-to-zod) site is also a handy conversion tool!
