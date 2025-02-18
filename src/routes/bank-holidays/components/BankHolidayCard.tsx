import { FC } from 'hono/jsx'
import { BankHoliday } from '../schemas/BankHoliday'

export const BankHolidayCard: FC<{ bankHoliday: BankHoliday }> = (props: { bankHoliday: BankHoliday }) => {

    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">{props.bankHoliday.title }</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    {props.bankHoliday.dateString }
                </div>
            </div>
        </div>
    )
}
