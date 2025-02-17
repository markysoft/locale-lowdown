import { applyBritishSummerTime, dayOfWeekFromDayNumber, toHourMinuteString } from '../../lib/utils'
import { HomeBusStop, TownBusStop } from '../../secretConfig'
import { BusStop, BusTime, busTimes } from './busTimes'

export function getNextBusToMalton(currentTime: Date) {
    return getNextBus(applyBritishSummerTime(currentTime), HomeBusStop, busTimes.toMalton)
}

export function getNextBusFromMalton(currentTime: Date) {
    return getNextBus(applyBritishSummerTime(currentTime), TownBusStop, busTimes.fromMalton)
}

export function getNextBus(currentTime: Date, stopName: string, schedule: BusStop[]) {
    const currentHourMins = toHourMinuteString(currentTime).replace(':', '')
    const dayOfWeek = currentTime.getDay()
    const myStopTimes = schedule
        .filter((stop: BusStop) => stop.name === stopName)[0].times
    const nextStop = myStopTimes.find((time: BusTime) => time.at > currentHourMins && time.daysOfWeek.includes(dayOfWeek))

    if (nextStop) {
        return `${formatTime(nextStop.at)} today`
    }
    const tomorrowInt = getTomorrowDayIndex(dayOfWeek)
    const tomorrowBus = myStopTimes.find((time: BusTime) => time.daysOfWeek.includes(tomorrowInt))

    if (tomorrowBus) {
        return `${formatTime(tomorrowBus.at)} on ${dayOfWeekFromDayNumber(tomorrowInt)}`
    }
    return 'No buses available'
}

function getTomorrowDayIndex(currentDay: number) {
    return currentDay === 6 || currentDay === 0 ? 1 : currentDay + 1
}

function formatTime(time: string): string {
    return time.slice(0, 2) + ':' + time.slice(2)
}
