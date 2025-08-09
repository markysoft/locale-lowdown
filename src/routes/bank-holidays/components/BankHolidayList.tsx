import { BankHoliday } from '../schemas/BankHoliday'
import { BankHolidayCard } from './BankHolidayCard'

export function BankHolidayList({ bankHolidays }: { bankHolidays: BankHoliday[] }) {
    return (
        < div id="bank-holidays-upcoming" >
            {bankHolidays.map((bankHoliday: BankHoliday) => <BankHolidayCard bankHoliday={bankHoliday} />)}
        </ div>
    )
}
