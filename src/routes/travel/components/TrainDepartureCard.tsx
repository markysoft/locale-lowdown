import { FC } from 'hono/jsx'
import { Departure } from '../services/trainTimes'

export const TrainDepartureCard: FC<{ service: Departure, showPlatforms: boolean }> =
    (props: { service: Departure, showPlatforms: boolean }) => {

        return (
            <nav class="level" style={{ 'margin-bottom': '1.5em' }}>
                <div class="level-left">
                    <div class="level-item has-text-centered has-text-left-desktop">
                        <p class="subtitle is-6"><strong>{props.service.standardTime}</strong> to {props.service.destination} { props.showPlatforms ? `(platform ${props.service.platform})` : ''}</p>
                    </div>
                </div>
                <div class="level-right">
                    <p class="level-item">
                        {props.service.isCancelled
                            ? <strong>Cancelled</strong>
                            : <span>{props.service.expected === 'On time' ? props.service.expected : <strong>Expected {props.service.expected}</strong>}</span>
                        }
                    </p>
                </div>
            </nav>
        )
    }
