import { Departure } from '../services/trainTimes'

export function TrainDepartureCard({ service, showPlatforms }: { service: Departure, showPlatforms: boolean }) {
    return (
        <nav class="level" style={{ 'margin-bottom': '1.5em' }}>
            <div class="level-left">
                <div class="level-item has-text-centered has-text-left-desktop">
                    <p class="subtitle is-6"><strong>{service.standardTime}</strong> to {service.destination} { showPlatforms ? `(platform ${service.platform})` : ''}</p>
                </div>
            </div>
            <div class="level-right">
                <p class="level-item">
                    {service.isCancelled
                        ? <strong>Cancelled</strong>
                        : <span>{service.expected === 'On time' ? service.expected : <strong>Expected {service.expected}</strong>}</span>
                    }
                </p>
            </div>
        </nav>
    )
}
