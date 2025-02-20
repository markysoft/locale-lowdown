import { FC } from 'hono/jsx'
import { Departure, Departures } from '../services/trainTimes'
import { TrainDepartureCard } from './TrainDepartureCard'

export const TrainDeparturesList: FC<{ departures: Departures }> = (props: { departures: Departures }) => {
    return (
        <>

            <div class="card">
                <header class="card-header">
                    <div class="tabs">
                        <ul style={{ 'margin-inline-start': '0em' }}>
                            <li class="is-active">
                                <a
                                    aria-label="get Malton train times"
                                    hx-get="/travel/train/mlt"
                                    hx-target="#train-departures"
                                    hx-indicator="#train-spinner">
                                    Malton
                                </a>
                            </li>
                            <li>
                                <a
                                    aria-label="get Scarborough train times"
                                    hx-get="/travel/train/sca"
                                    hx-target="#train-departures"
                                    hx-indicator="#train-spinner">
                                    Scarborough
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
                                <TrainDepartureCard service={service} />
                                {index < props.departures.trainServices.length - 1 && <hr />}
                            </>
                        })
                    }
                </div>
            </div>
        </>
    )
}