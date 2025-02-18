import { FC } from 'hono/jsx'
import { TideRecord } from '../schemas/Tide'

export const TidesCard: FC<{ tideRecord: TideRecord }> = (props: { tideRecord: TideRecord }) => {

    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title is-capitalized">{props.tideRecord.location}</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    <ul class="no-bullets">
                        {props.tideRecord.tides.map((tide) => <li> <strong>{tide.type}</strong> tide at <strong>{tide.time}</strong> ({tide.height}m)</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
