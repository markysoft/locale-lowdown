# Locale Lowdown

Application to explore Spin and HTMX

## Overview

It's a convenient site to show me the current weather, when my next bus is and so on. Of limited use to people that don't live where I do.

See it [here](https://locale-lowdown.fermyon.app/)

## Front End

The front end is developed in [HTMX](https://www.htmx.org). Not everything needs to be a Single Page Appliction calling a JSON API!

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

As I wanted to server HTML snippets for the HTMX fragments I needed a templating library. I settled on [Squirrelly](https://squirrelly.js.org/docs/) as it had no dependencies. 

Loading templates in the normal server side fashion was a no go, but I worked around it by loading everything into [Registered Partials](https://squirrelly.js.org/docs/syntax/partials-layouts) on startup, then [departial](./src/lib/departial.ts)ing to use like a regular template.

I could have added a Spin Static File server component, but only have two files to serve - the [index.html](./assets/index.html) and the [site.css](./assets/site.css), so added explicit routes for them. Also means I can swap the index for template if need be.

I had issues with an RSS parsing library due to dependencies, so had to resort to parsing the html directly, though it works OK in the [AI News Feeder project](https://github.com/fermyon/ai-examples/blob/main/newsfeeder-ts).

Spin cloud comes with a handy key vault store, which I use to cache weather requests etc, as the free tier of Accuweather only allows 50 calls a day.

## Testing

Testing is challenging, there are ways of [integration testing Spin applications](https://developer.fermyon.com/spin/v3/testing-apps#testing-applications) by calling the compiled WebAssembly directly, but I wanted some unit tests.

I settled on using the standard node [Test runner](https://nodejs.org/api/test.html). It's good enough for testing business logic, but as it's a different environment than WebAssembly it's not 100% like for like - so you might run into the odd edge case.

The test folders sit outside the src folder so doit doesn't picked up during the wasm build.

## External Resources

Tide times from [www.tidetimes.org.uk](https://www.tidetimes.org.uk), weather from [www.accuweather.com](https://www.accuweather.com), and bank holidays from [www.gov.uk](http://www.gov.uk/bank-holidays). 

The [json-to-zod](https://transform.tools/json-to-zod) site is also a handy conversion tool!


