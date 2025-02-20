import { FC } from 'hono/jsx'
import { Departure, Departures } from '../services/trainTimes'
import { TrainDepartureCard } from './TrainDepartureCard'

export const TrainDeparturesList: FC<{ departures: Departures }> = (props: { departures: Departures }) => {
    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Train Departures from {props.departures.locationName} as of {props.departures.generatedAt} <span id="train-spinner" class="htmx-indicator">&nbsp;<i class="fa fa-spinner fa-spin"></i></span></p>
                
                <button class="card-header-icon" aria-label="refresh train times" hx-get="/travel/train" hx-target="#train-departures" hx-indicator="#train-spinner">
                    <span class="icon">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </span>
                </button>
            </header>
            <div class="card-content">
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
    )
}