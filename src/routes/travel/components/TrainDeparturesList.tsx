import { FC } from 'hono/jsx'
import { Departure, Departures } from '../services/trainTimes'
import { TrainDepartureCard } from './TrainDepartureCard'



export const TrainDeparturesList: FC<{ departures: Departures }> = (props: { departures: Departures }) => {

    const isActive = (crs: string) => {
        return props.departures.crs === crs ? 'is-active' : ''
    }

    const showPlatforms = (): boolean => {
        return props.departures.crs !== 'MLT'
    }

    return (
        <>
        <h2 class="title has-text-primary-15">Trains</h2>
        <div class="card">
            <header class="card-header">
                <div class="tabs">
                    <ul style={{ 'margin-inline-start': '0em' }}>
                        <li class={isActive('MLT')}>
                            <a
                                aria-label="get Malton train times"
                                hx-get="/travel/train/mlt"
                                hx-target="#train-departures"
                                hx-indicator="#train-spinner">
                                Malton
                            </a>
                        </li>
                        <li class={isActive('SCA')}>
                            <a
                                aria-label="get Scarborough train times"
                                hx-get="/travel/train/sca"
                                hx-target="#train-departures"
                                hx-indicator="#train-spinner">
                                Scarborough
                            </a>
                        </li>
                        <li class={isActive('YRK')}>
                            <a
                                aria-label="get York train times"
                                hx-get="/travel/train/yrk"
                                hx-target="#train-departures"
                                hx-indicator="#train-spinner">
                                York
                            </a>
                        </li>
                    </ul>
                </div>

            </header>
            <div class="card-content">

                <p class="content">Last updated: <strong>{props.departures.generatedAt}</strong> <span id="train-spinner" class="htmx-indicator">&nbsp;<i class="fa fa-spinner fa-spin"></i></span></p>
                {
                    props.departures.trainServices.map((service: Departure, index: number) => {
                        return <>
                            <TrainDepartureCard service={service} showPlatforms={showPlatforms()} />
                            {index < props.departures.trainServices.length - 1 && <hr />}
                        </>
                    })
                }
            </div>
        </div>
        </>
    )
}