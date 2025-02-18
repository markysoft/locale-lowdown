import { FC } from 'hono/jsx'
import { WeekAheadDay } from '../schemas/Weather'

export const WeatherCard: FC<{ weekAheadDay: WeekAheadDay }> = (props: { weekAheadDay: WeekAheadDay }) => {

    return (
        <div class="card">
            <div class="card-content">
                <div class="content has-text-centered">
                    <h3> {props.weekAheadDay.weather.date}: {props.weekAheadDay.weather.main}</h3>
                    <p>
                        {props.weekAheadDay.weather.description?.map((line) => <>{line}<br /></>)}
                    </p>
                    <p><strong>Chance of Rain:</strong> {props.weekAheadDay.weather.chanceOfRain}</p>
                    <p><strong>Temp:</strong> {props.weekAheadDay.weather.temp.min} to
                        {props.weekAheadDay.weather.temp.max}°C</p>

                    <p><strong>Wind: </strong>{props.weekAheadDay.weather.wind.speed} MPH
                        {props.weekAheadDay.weather.wind.degrees}<br />
                        Gusts up to {props.weekAheadDay.weather.wind.maxSpeed} MPH</p>

                    <p><strong>Sunrise:</strong> {props.weekAheadDay.sun.rise},
                        <strong>Sunset:</strong> {props.weekAheadDay.sun.set}
                    </p>
                </div>
            </div>
        </div>
    )
}
