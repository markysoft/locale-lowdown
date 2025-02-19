import { FC } from 'hono/jsx'
import { Departures } from '../services/trainTimes'

export const TrainDeparturesCard: FC<{ departures: Departures }> = (props: { departures: Departures }) => {

    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Train Departures from {props.departures.locationName} at {props.departures.generatedAt}</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Train</th>
                                <th>Expected</th>
                                <th>PLT</th>
                                <th>Operator</th>
                                <th>Cancelled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.departures.trainServices.map((service) => {
                                return (
                                    <tr>
                                        <td>{service.standardTime} to {service.destination}</td>
                                        <td>{service.expected}</td>
                                        <td>{service.platform}</td>
                                        <td>{service.operator}</td>
                                        <td>{service.isCancelled ? 'Yes' : 'No'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
