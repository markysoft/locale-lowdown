const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function dashDateStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(s => Number(s))
    return new Date(year, month - 1, day)
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

export function toHourMinuteString(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}