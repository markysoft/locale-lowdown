import { BankHoliday } from '../schemas/BankHoliday'

export function BankHolidayCard({ bankHoliday }: { bankHoliday: BankHoliday }) {

    return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">{bankHoliday.title }</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    {bankHoliday.dateString }
                </div>
            </div>
        </div>
    )
}
