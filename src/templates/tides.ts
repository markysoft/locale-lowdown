export const tideTemplate = `
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">{{it.tideRecord.date}}</p>
        </header>
        <div class="card-content">
            <div class="content has-text-centered">
                <ul class="no-bullets">
                    {{@each(it.tideRecord.tides) => tide, index}}
                        <li>{{tide.type}} Tide at {{tide.time}} ({{tide.height}}m)</li>
                    {{/each}}
                </ul>
            </div>
        </div>
    </div>
`