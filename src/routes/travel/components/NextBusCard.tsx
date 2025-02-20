import { FC } from 'hono/jsx'

export const NextBusCard: FC<{ nextBusTo: string, nextBusFrom: string }> = (props: { nextBusTo: string, nextBusFrom: string }) => {

    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Bus Departures</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    <p>
                        Next Bus to Malton is <strong>{props.nextBusTo}</strong> <br />
                        Next Bus from Malton is <strong>{props.nextBusFrom}</strong>
                    </p>
                    <p>Check the <a href="https://getdown.org.uk/bus/bus/194.shtml" target="_blank">schedule</a> for more
                        details</p>
                </div>
            </div>
        </div>
    )
}
