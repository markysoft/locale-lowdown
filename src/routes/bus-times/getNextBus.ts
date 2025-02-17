/* eslint-disable @typescript-eslint/no-explicit-any */
import { dayOfWeekFromDayNumber, toHourMinuteString } from '../../lib/utils'
import { busTimes } from './busTimes'

export function getNextBusToMalton(currentTime: Date) {
    return getNextBus(currentTime, 'Barton le Street', busTimes.toMalton)
}

export function getNextBusFromMalton(currentTime: Date) {
    return getNextBus(currentTime, 'MALTON Bus Station', busTimes.fromMalton)
}

export function getNextBus(currentTime: Date, stopName: string, schedule: any) {
    const currentHourMins = toHourMinuteString(currentTime).replace(':', '')
    const dayOfWeek = currentTime.getDay()
    const myStopTimes = schedule
        .filter((stop: any) => stop.name === stopName)[0].times
    const nextStop = myStopTimes.find((time: any) => time.at > currentHourMins && time.daysOfWeek.includes(dayOfWeek))

    if (nextStop) {
        return `${formatTime(nextStop.at)} today`
    }
    const tomorrowInt = getTomorrowDayIndex(dayOfWeek)
    const tomorrowBus = myStopTimes.find((time: any) => time.daysOfWeek.includes(tomorrowInt))
    return `${formatTime(tomorrowBus?.at)} on ${dayOfWeekFromDayNumber(tomorrowInt)}`
}

function getTomorrowDayIndex(currentDay: number) {
    return currentDay === 6 || currentDay === 0 ? 1 : currentDay + 1
}

function formatTime(time: string): string {
    return time.slice(0, 2) + ':' + time.slice(2)
}