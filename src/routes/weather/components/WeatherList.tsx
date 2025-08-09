import { FC } from 'hono/jsx'
import { WeekAheadDay } from '../schemas/Weather'
import { WeatherCard } from './WeatherCard'

export const WeatherList: FC<{ weekAhead: WeekAheadDay[] }> = (props: { weekAhead: WeekAheadDay[] }) => {
    return (
        < div id="weather-week-ahead" >
            {props.weekAhead.map((weekAheadDay: WeekAheadDay) => <WeatherCard weekAheadDay={weekAheadDay} />)}
        </ div>
    )
}
