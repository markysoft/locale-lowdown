import { FC } from 'hono/jsx'
import { BankHoliday } from '../schemas/BankHoliday'
import { BankHolidayCard } from './BankHolidayCard'

export const BankHolidayList: FC<{ bankHolidays: BankHoliday[] }> = (props: { bankHolidays: BankHoliday[] }) => {
    return (
        < div id="bank-holidays-upcoming" >
            {props.bankHolidays.map((bankHoliday: BankHoliday) => <BankHolidayCard bankHoliday={bankHoliday} />)}
        </ div>
    )
}
