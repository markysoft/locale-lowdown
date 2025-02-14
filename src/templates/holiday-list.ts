export const holidayTemplate = `

    {{@each(it.holidays) => holiday, index}}
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">{{holiday.title}}</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    {{holiday.dateString}}
                </div>
            </div>
        </div>
    {{/each}}
`