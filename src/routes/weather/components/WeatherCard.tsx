import { WeekAheadDay } from '../schemas/Weather'

export function WeatherCard({ weekAheadDay }: { weekAheadDay: WeekAheadDay }) {

    return (
        <div class="card">
            <div class="card-content">
                <div class="content has-text-centered">
                    <h3> {weekAheadDay.weather.date}: {weekAheadDay.weather.main}</h3>
                    <p>
                        {weekAheadDay.weather.description?.map((line) => <>{line}<br /></>)}
                    </p>
                    <p><strong>Chance of Rain:</strong> {weekAheadDay.weather.chanceOfRain}</p>
                    <p><strong>Temp:</strong> {weekAheadDay.weather.temp.min} to {weekAheadDay.weather.temp.max}°C</p>

                    <p><strong>Wind: </strong>{weekAheadDay.weather.wind.speed} MPH {weekAheadDay.weather.wind.degrees}<br />
                        Gusts up to {weekAheadDay.weather.wind.maxSpeed} MPH</p>

                    <p><strong>Sunrise:</strong> {weekAheadDay.sun.rise},&nbsp;
                        <strong>Sunset:</strong> {weekAheadDay.sun.set}
                    </p>
                </div>
            </div>
        </div>
    )
}
