import { decode } from 'html-entities'
import parse from 'node-html-parser'
import { TideSchema, Tide, TideRecordSchema, TideRecord } from './schemas/Tide'

export async function getTidesRssText() {
    const tidesResponse = await fetch('https://www.tidetimes.org.uk/whitby-tide-times.rss')
    return await tidesResponse.text()
}

export function getRawTides(text: string): string[] {
    const desc = parse(text).querySelector('channel item description')
    const descVal = decode(desc?.innerText.toString())
    return descVal.split('<br/>').filter(l => /High|Low Tide/.test(l))
}

export function parseTide(rawTide: string): Tide | undefined {
    const regex = /(\d+:\d+).*(High|Low) Tide \((.*)m\)/i
    const matches = rawTide.match(regex)
    if (matches) {
        return TideSchema.parse({ time: matches[1], type: matches[2], height: matches[3] })
    }
    return undefined
}

function getPubDate(text: string): Date {
    const pubTag = parse(text).getElementsByTagName('pubDate')[0]
    return pubTag?.rawText === undefined ? new Date() : new Date(pubTag.rawText)
}

export function getTideRecord(rssText: string): TideRecord {
    const rawTides = getRawTides(rssText)
    const date: Date = getPubDate(rssText)
    const tides = rawTides.map(parseTide).filter(t => t !== undefined) as Tide[]
    return TideRecordSchema.parse({ tides, date })
}

export async function getTides(): Promise<TideRecord> {
    const rssText = await getTidesRssText()
    return getTideRecord(rssText)
}
