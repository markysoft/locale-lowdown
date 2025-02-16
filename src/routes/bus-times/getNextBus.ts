/* eslint-disable @typescript-eslint/no-explicit-any */
import { toHourMinuteString } from '../../lib/utils'
import { busTimes } from './busTimes'

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function getNextBusToMalton(currentTime: Date) {
    return getNextBus(currentTime, 'Barton le Street', busTimes.toMalton)
}

export function getNextBusFromMalton(currentTime: Date) {
    return getNextBus(currentTime, 'MALTON Bus Station', busTimes.fromMalton)
}

export function getNextBus(currentTime: Date, stopName: string, schedule: any) {
    const currentHourMins = toHourMinuteString(currentTime).replace(':', '')
    const dayOfWeek = currentTime.getDay()
    console.log('chm', currentHourMins)
    console.log('dow', dayOfWeek)
    const myStopTimes = schedule
        .filter((stop: any) => stop.name === stopName)[0].times
    const nextStop = myStopTimes.find((time: any) => time.at > currentHourMins && time.daysOfWeek.includes(dayOfWeek))

    if (nextStop) {
        return `${nextStop.at} today`
    }
    const tomorrowInt = getTomorrowDayIndex(dayOfWeek)
    console.log('tomorrowInt', tomorrowInt)
    const tomorrowBus = myStopTimes.find((time: any) => time.daysOfWeek.includes(tomorrowInt))
    return `${tomorrowBus?.at} on ${dayNames[tomorrowInt]}`
}

function getTomorrowDayIndex(currentDay: number) {
    return currentDay === 6 || currentDay === 0 ? 1 : currentDay + 1
}