import { BinDay } from "../schemas/BinDay"


const firstBinDate = new Date('2025-07-02') // Start date for bin schedule
const dayInMilliseconds = 24 * 60 * 60 * 1000
const weekInMilliseconds = 7 * dayInMilliseconds

export function getNextFourBinDays(startDate: Date): BinDay[] {
    const binDays: BinDay[] = []
    let currentDate = startDate

    for (let i = 0; i < 4; i++) {
        const nextBinDay = getNextBinDay(currentDate)
        binDays.push(nextBinDay)
        currentDate = addDays(nextBinDay.date, 7) // Move to the next Wednesday
    }

    return binDays
}

export function getNextBinDay(currentDate: Date): BinDay {


    const nextWeds = getNextWednesday(currentDate)
    const weeksSinceFirstBin = Math.floor(Math.abs(
        (nextWeds.getTime() - firstBinDate.getTime()) / weekInMilliseconds))

    if (weeksSinceFirstBin % 2 === 0) {
        return {
            date: nextWeds,
            type: 'rubbish',
            description: 'General waste collection',
        }
    }
    if (weeksSinceFirstBin % 4 === 1) {
        return {
            date: nextWeds,
            type: 'red bin',
            description: 'Recycling collection: glasses, cans, plastics, and cartons',
        }
    }
    return {
        date: nextWeds,
        type: 'blue bin',
        description: 'Recycling collection: paper and card',
    }
}


function addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

function getNextWednesday(date: Date): Date {
    if (date.getDay() == 3) {
        return date
    }
    const nextWednesday = new Date(date)
    return addDays(nextWednesday, ((3 - nextWednesday.getDay() + 7) % 7))
}
