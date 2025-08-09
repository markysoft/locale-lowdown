import { TideRecord } from '../schemas/Tide'

export function TidesCard({ tideRecord }: { tideRecord: TideRecord }) {

    return (
        <div id="tides" class="card">
            <header class="card-header">
                <p class="card-header-title is-capitalized">{tideRecord.location}</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    <ul class="no-bullets">
                        {tideRecord.tides.map((tide) => <li> <strong>{tide.type}</strong> tide at <strong>{tide.time}</strong> ({tide.height}m)</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
