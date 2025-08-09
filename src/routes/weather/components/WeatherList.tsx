import { WeekAheadDay } from '../schemas/Weather'
import { WeatherCard } from './WeatherCard'

export function WeatherList({ weekAhead }: { weekAhead: WeekAheadDay[] }) {
    return (
        < div id="weather-week-ahead" >
            {weekAhead.map((weekAheadDay: WeekAheadDay) => <WeatherCard weekAheadDay={weekAheadDay} />)}
        </ div>
    )
}
