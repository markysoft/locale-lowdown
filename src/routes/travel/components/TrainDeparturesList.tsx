import { FC } from 'hono/jsx'
import { Departure, Departures } from '../services/trainTimes'
import { TrainDepartureCard } from './TrainDepartureCard'

export const TrainDeparturesList: FC<{ departures: Departures }> = (props: { departures: Departures }) => {
    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Train Departures from {props.departures.locationName} as of {props.departures.generatedAt}</p>
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