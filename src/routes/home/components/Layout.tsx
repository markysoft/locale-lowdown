import type { FC } from 'hono/jsx'

export const Layout: FC = () => {
    return (
        <>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Locale Lowdown - Barton-le-Street Edition</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css" />
                <script src="https://kit.fontawesome.com/c2b6fd3803.js" crossorigin="anonymous"></script>
                <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js"></script>
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
                        <div data-on-datastar-fetch="$_fetchError = evt.detail.type === 'retrying' || evt.detail.type === 'retry-failed'"></div>
                        <div class="box error-message" data-show="$_fetchError" style="position: fixed; bottom: 0em; left: 0em; padding: 1em; z-index: 1000; display: none;">
                            <p class="has-text-danger is-size-4">Network issues. Please try again later.</p>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Weather</h2>
                                    <button data-on-click="@get('/sse')">

                                        Open the pod bay doors, HAL.

                                    </button>

                                    <div id="foo"></div>
                                    <div id="weather-today" data-on-load="@get('/weather/today')" >
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <div id='travel-bus' data-on-load="@get('/travel/bus')">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Bins</h2>
                                    <div id="bins" data-on-load="@get('/bins')">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <div id="train-departures" data-indicator="_fetchTrains" data-on-load="@get('/travel/train/mlt')" >
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Tides</h2>
                                    <div id="tides" data-on-load="@get('/tides')">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Next Bank Holiday</h2>
                                    <div id="bank-holidays-next" data-on-load="@get('/bank-holidays/next')">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Weather for the Week</h2>
                                    <div id="weather-week-ahead" data-on-load="@get('/weather/week-ahead')">
                                        <div class="spinner box has-text-centered">
                                            <div class="fa fa-spinner fa-spin"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="content">
                                    <h2 class="title has-text-primary-15">Bank Holidays</h2>
                                    <div id="bank-holidays-upcoming" data-on-load="@get('/bank-holidays/upcoming')">
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
                                <strong><a href="https://data-star.dev/" target="_blank">DataStar</a></strong> + <strong>
                                    <a href="https://bulma.io/" target="_blank">Bulma</a></strong> & <strong>
                                    <a href="https://fontawesome.com">Font Awesome</a></strong> frontend<br />
                                Tide times from <a href="https://www.tidetimes.org.uk/" target="_blank">www.tidetimes.org.uk</a>,
                                weather from <a href="https://openweathermap.org/" target="_blank">www.openweathermap.org</a>,
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
