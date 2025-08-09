import { getAppSettings } from '../../../appSettings'
import { MetOfficeWeather, MetOfficeWeatherSchema } from '../schemas/MetOffice'

async function callMetOfficeApi(): Promise<any> {
  const apiKey = getAppSettings().weather.metOfficeApiKey || ''
  const response = await fetch( getUrl(), {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'apikey': apiKey
    }
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return await response.json()
}

function getUrl(): string {
  const lat = 54.16
  const long = -0.89
  const dataSource = 'BD1'
  return `https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?dataSource=${dataSource}&latitude=${lat}&longitude=${long}`
}

export async function getMetWeather() : Promise<MetOfficeWeather> {
  const rawWeather = await callMetOfficeApi()
  const weather = MetOfficeWeatherSchema.parse(rawWeather.features[0].properties)
  return weather
}
