import { FC } from 'hono/jsx'
import { Departure, Departures } from '../services/trainTimes'
import { TrainDepartureCard } from './TrainDepartureCard'



export const TrainDeparturesList: FC<{ departures: Departures }> = (props: { departures: Departures }) => {

    const stationList = [
        { name: 'Malton', crs: 'MLT' },
        { name: 'Scarbo\'', crs: 'SCA' },
        { name: 'York', crs: 'YRK' },
        { name: 'Leeds', crs: 'LDS' }
    ]
    const isActive = (crs: string) => {
        return props.departures.crs === crs ? 'is-active' : ''
    }

    const showPlatforms = (): boolean => {
        return props.departures.crs !== 'MLT'
    }

    return (
        < div id="train-departures">
            <h2 class="title has-text-primary-15">Trains</h2>
            <div class="card">
                <header class="card-header">
                    <div class="tabs">
                        <ul style={{ 'margin-inline-start': '0em' }}>
                            {stationList.map(station => (
                                <li class={isActive(station.crs)} key={station.crs}>
                                    <a
                                        aria-label={`get ${station.name} train times`}
                                        hx-get={`/travel/train/${station.crs.toLowerCase()}`}
                                        hx-target="#train-departures"
                                        hx-indicator="#train-spinner">
                                        {station.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </header>
                <div class="card-content">

                    <p class="content">
                        Last updated: <strong>{props.departures.generatedAt}</strong>
                        <span id="train-spinner" data-show="$_fetchTrains">&nbsp;<i class="fa fa-spinner fa-spin"></i></span>
                    </p>
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
        </div>
    )
}
