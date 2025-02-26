

import type { FC } from 'hono/jsx'

export const Layout: FC = () => {
    return (
        <>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="htmx-config"
                    content='{"responseHandling": [{"code":"204", "swap": false},{"code":"...", "swap": true}]}' />
                <title>Locale Lowdown - Barton-le-Street Edition</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css" />
                <script src="https://kit.fontawesome.com/c2b6fd3803.js" crossorigin="anonymous"></script>
                <script src="https://unpkg.com/htmx.org@2.0.4"
                    integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
                    crossorigin="anonymous"></script>
                <style>
                    {`
                        ul.no-bullets {
                        list-style-type: none;
                        }

                        .xspinner {
                        padding: 5.5em;
                        height: 12em;
                        }

                        .footer {
                            --bulma-footer-padding: 3rem 1.5rem 3rem;
                        }

                `}
                </style>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        document.addEventListener('htmx:sendError', function (event) {
                            document.querySelector('.error-message').style.display = 'block'
                        });
                    `
                }} />                
            </head>

            <body>
                <section class="section">
                    <div class="container">
                        <h1 class="title">
                            Locale Lowdown
                        </h1>
                        <p class="subtitle">
                            Barton-le-Street Edition
                        </p>
                        <div class="box error-message" style="position: fixed; bottom: 0em; left: 0em; padding: 1em; z-index: 1000; display: none;">
                            <p class="has-text-danger is-size-4">Network issues. Please try again later.</p>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Weather</h2>
                                    <div hx-get="/weather/today" hx-trigger="load">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>                                
                                <div class="content">
                                    <div hx-get="/travel/bus" hx-trigger="load">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <div hx-get="/travel/train/mlt" hx-trigger="load" id="train-departures">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Tides</h2>
                                    <div hx-get="/tides" hx-trigger="load">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Next Bank Holiday</h2>
                                    <div hx-get="/bank-holidays/next" hx-trigger="load">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Weather for the Week</h2>
                                    <div hx-get="/weather/week-ahead" hx-trigger="load">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Bank Holidays</h2>
                                    <div hx-get="/bank-holidays/upcoming" hx-trigger="load">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer class="footer">
                            <div class="content has-text-centered">
                                <strong><a href="https://developer.fermyon.com/spin/v3/index" target="_blank">Spin</a></strong> and &nbsp;
                                <strong><a href="https://hono.dev" target="_blank">Hono</a></strong> backend, <br />
                                <strong><a href="https://htmx.org/" target="_blank">HTMX</a></strong> + <strong>
                                    <a href="https://bulma.io/" target="_blank">Bulma</a></strong> & <strong>
                                    <a href="https://fontawesome.com">Font Awesome</a></strong> frontend<br />
                                Tide times from <a href="https://www.tidetimes.org.uk/" target="_blank">www.tidetimes.org.uk</a>,
                                weather from <a href="https://www.accuweather.com/" target="_blank">www.accuweather.com</a>,
                                bank holidays from <a href="https://www.gov.uk/bank-holidays/" target="_blank">www.gov.uk</a>
                                <p>Source available at <a href="https://github.com/markysoft/locale-lowdown">locale-lowdown</a></p>
                            </div>
                        </footer>
                    </div>
                </section>
            </body>
        </>
    )
}
