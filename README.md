# Locale Lowdown

Application to explore Spin and HTMX

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

The back end uses [Spin](https://developer.fermyon.com/spin/v3/index) which is essentially Typescript compiled to WASM.

It's super fast to spin up, is a small deployment, and you can currently host up to 5 apps for free. Check it out!

Being WASM, the full server side Node.js experience is not available, so package support is limited. This means you may need to be creative in how you approach things if you can't rely on your usual NPM packages.

As I wanted to server HTML snippets for the HTMX fragments I needed a templating library. I settled on [Squirrelly](https://squirrelly.js.org/docs/) as it had no dependencies. 

Loading templates in the normal server side fashion was a no go, but I worked around it by loading everything into [Registered Partials](https://squirrelly.js.org/docs/syntax/partials-layouts) on startup, then [departial](./src/lib/departial.ts)ing to use like a regular template.

I could have added a Spin Static File server component, but only have two files to serve - the [index.html](./assets/index.html) and the [site.css](./assets/site.css), so added explicit routes for them. Also means I can swap the index for template if need be.

I had issues with an RSS parsing library due to dependencies, so had to resort to parsing the html directly, though it works OK in the [AI News Feeder project](https://github.com/fermyon/ai-examples/blob/main/newsfeeder-ts).

## Testing

Testing is challenging, there is ways of [integration testing Spin applications](https://developer.fermyon.com/spin/v3/testing-apps#testing-applications) by calling the compiled Wasm directly, but I wanted some unit tests.

I settled on usi


