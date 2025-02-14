import {
    dashDateStringToDate,
    getOneYearsTime,
    toFriendlyDate,
    toHourMinuteString,
    degreesToCompass,
    splitOnSemiColons,
    kmToMiles
} from '../../src/lib/utils'
import { describe, test } from 'node:test'
import assert from 'assert'

describe('utils', () => {
    test('dashDateStringToDate', () => {
        const date = dashDateStringToDate('2025-02-14')
        assert.equal(date.getFullYear(), 2025)
        assert.equal(date.getMonth(), 1) // February is month 1 (0-indexed)
        assert.equal(date.getDate(), 14)
    })

    test('getOneYearsTime', () => {
        const date = new Date('2025-02-14')
        const oneYearLater = getOneYearsTime(date)
        assert.equal(oneYearLater.getFullYear(), 2026)
        assert.equal(oneYearLater.getMonth(), 1) // February is month 1 (0-indexed)
        assert.equal(oneYearLater.getDate(), 14)
    })

    test('toFriendlyDate', () => {
        const date = new Date('2025-02-14')
        const friendlyDate = toFriendlyDate(date)
        assert.equal(friendlyDate, 'Friday 14 February 2025')
    })

    test('toHourMinuteString handles single-digit hours', () => {
        const date = new Date('2025-02-14T05:07:00')
        const timeString = toHourMinuteString(date)
        assert.equal(timeString, '05:07')
    })

    test('toHourMinuteString handles double-digit hours', () => {
        const date = new Date('2025-02-14T12:30:00')
        const timeString = toHourMinuteString(date)
        assert.equal(timeString, '12:30')
    })

    test('degreesToCompass', () => {
        assert.equal(degreesToCompass(0), 'N')
        assert.equal(degreesToCompass(45), 'NE')
        assert.equal(degreesToCompass(90), 'E')
        assert.equal(degreesToCompass(135), 'SE')
        assert.equal(degreesToCompass(180), 'S')
        assert.equal(degreesToCompass(225), 'SW')
        assert.equal(degreesToCompass(270), 'W')
        assert.equal(degreesToCompass(315), 'NW')
    })

    test('splitOnSemiColons', () => {
        const input = 'a;b;c'
        const result = splitOnSemiColons(input)
        assert.deepEqual(result, ['a', 'b', 'c'])
    })

    test('splitOnSemiColons handles empty input', () => {
        const input = ''
        const result = splitOnSemiColons(input)
        assert.deepEqual(result, [])
    })

    test('kmToMiles', () => {
        assert.equal(kmToMiles(1), 1)
        assert.equal(kmToMiles(5), 3)
        assert.equal(kmToMiles(10), 6)
    })
})