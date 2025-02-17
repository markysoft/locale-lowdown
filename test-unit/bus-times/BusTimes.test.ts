import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { getNextBusToMalton, getNextBus } from '../../src/routes/bus-times/getNextBus'

describe('Bus Times', () => {
    test('Should return 1328 for 12:00', () => {
        const nextBusToMalton = getNextBusToMalton(new Date('2022-12-28T12:00:00Z'))
        console.log(nextBusToMalton)
        assert.strictEqual(nextBusToMalton, '13:28 today')
    })

    test('Should return next available time for next day', () => {
        const nextBusToMalton = getNextBusToMalton(new Date('2025-02-14T19:00:00Z'))
        console.log(nextBusToMalton)
        assert.ok(nextBusToMalton)
        assert.strictEqual(nextBusToMalton, '08:18 on Saturday')
    })

    test('Should return Monday bus for late Saturday', () => {
        const nextBusToMalton = getNextBusToMalton(new Date('2025-02-15T19:00:00Z'))
        console.log(nextBusToMalton)
        assert.ok(nextBusToMalton)
        assert.strictEqual(nextBusToMalton, '07:28 on Monday')
    })

    test('Should return "No buses available" when no buses are available', () => {
        const nextBus = getNextBus(new Date('2025-02-14T09:00:00Z'), 'Test Stop', [{ name: 'Test Stop', times: [] }])
        assert.strictEqual(nextBus, 'No buses available')
    })
})
