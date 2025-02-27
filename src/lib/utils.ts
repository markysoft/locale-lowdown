const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function dashDateStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(s => Number(s))
    const date = new Date(year, month - 1, day)
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string')
    }
    return date
}

export function getOneYearsTime(d: Date): Date {
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    return new Date(year + 1, month, day)
}

export function toFriendlyDate(date: Date): string {
    const dayOfWeek = dayNames[date.getDay()]
    const dayOfMonth = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`
}

export function getDayOfWeek(date: Date): string {
    return dayNames[date.getDay()]
}

export function dayOfWeekFromDayNumber(dayNumber: number): string {
    return dayNames[dayNumber]
}

export function toHourMinuteString(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export function degreesToCompass(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
}

export function splitOnSemiColons(input: string): string[] {
    return input.split(';').filter(s => s.length > 0)
}

export function kmToMiles(km: number): number {
    const milesPerKm = 0.621
    return Math.round(km * milesPerKm)
}

export function applyBritishSummerTime(date: Date): Date {
    const year = date.getFullYear()
    const startBST = getLastSundayOfMonth(year, 2) // Last Sunday in March
    const endBST = getLastSundayOfMonth(year, 9) // Last Sunday in October

    if (date >= startBST && date < endBST) {
        // Apply BST (add one hour)
        return new Date(date.getTime() + 60 * 60 * 1000)
    }
    return date
}

export function getLastSundayOfMonth(year: number, month: number): Date {
    const lastDay = new Date(year, month + 1, 0) // Last day of the month
    const dayOfWeek = lastDay.getDay()
    const lastSunday = lastDay.getDate() - dayOfWeek // Calculate the last Sunday
    return new Date(year, month, lastSunday)
}