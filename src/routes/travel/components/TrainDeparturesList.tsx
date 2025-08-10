import { Departure, Departures } from '../services/trainTimes'
import { TrainDepartureCard } from './TrainDepartureCard'



export function TrainDeparturesList({ departures }: { departures: Departures }) {

    const stationList = [
        { name: 'Malton', crs: 'MLT' },
        { name: 'Scarbo\'', crs: 'SCA' },
        { name: 'York', crs: 'YRK' },
        { name: 'Leeds', crs: 'LDS' }
    ]
    const isActive = (crs: string) => {
        return departures.crs === crs ? 'is-active' : ''
    }

    const showPlatforms = (): boolean => {
        return departures.crs !== 'MLT'
    }

    function getTrainUrl(station: { crs: string }) {
        return `@get('/travel/train/${station.crs.toLowerCase()}')`
    }

    return (
        < div id="train-departures">
            <h2 class="title has-text-primary-15">Trains</h2>
            <div data-signals="{'_fetchTrains': true}"></div>
            <div class="card">
                <header class="card-header">
                    <div class="tabs">
                        <ul style={{ 'margin-inline-start': '0em' }}>
                            {stationList.map(station => (
                                <li class={isActive(station.crs)} key={station.crs}>
                                    <a
                                        aria-label={`get ${station.name} train times`}
                                        data-on-click={getTrainUrl(station)}
                                        data-indicator="_fetchTrains"
                                    >{station.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </header>
                <div class="card-content">

                    <p class="content">
                        Last updated: <strong>{departures.generatedAt}</strong>
                        <span id="train-spinner" data-show="$_fetchTrains">&nbsp;<i class="fa fa-sync fa-spin"></i></span>
                    </p>
                    {
                        departures.trainServices.map((service: Departure, index: number) => {
                            return <>
                                <TrainDepartureCard service={service} showPlatforms={showPlatforms()} />
                                {index < departures.trainServices.length - 1 && <hr />}
                            </>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
