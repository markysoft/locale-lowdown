import { FC } from 'hono/jsx'
import { WeekAheadDay } from '../schemas/Weather'
import { WeatherCard } from './WeatherCard'

export const WeatherList: FC<{ weekAhead: WeekAheadDay[] }> = (props: { weekAhead: WeekAheadDay[] }) => {
    return (
        < >
            {props.weekAhead.map((weekAheadDay: WeekAheadDay) => <WeatherCard weekAheadDay={weekAheadDay} />)}
        </>
    )
}