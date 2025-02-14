export const weatherTemplate = `
    <div class="card">
        <div class="card-content">
            <div class="content has-text-centered">
             <h3>Main outlook: {{it.weatherRecord.weather.main}}</h3>
                <p>
                {{@each(it.weatherRecord.weather.description) => line, index}}
                {{line}}<br/>
                {{/each}}
                </p>
                <p><strong>Chance of Rain:</strong> {{it.weatherRecord.weather.chanceOfRain}}</p>
                <p><strong>Temp:</strong> {{it.weatherRecord.weather.temp.min}} to
                 {{it.weatherRecord.weather.temp.max}}°C</p>

                <p><strong>Wind: </strong>{{it.weatherRecord.weather.wind.speed}} MPH 
                 {{it.weatherRecord.weather.wind.degrees}}<br/>
                 Gusts up to {{it.weatherRecord.weather.wind.maxSpeed}} MPH</p>

                 <p><strong>Sunrise:</strong> {{it.weatherRecord.sun.rise}}, 
                 <strong>Sunset:</strong> {{it.weatherRecord.sun.set}}</p>
            </div>
        </div>
    </div>
`