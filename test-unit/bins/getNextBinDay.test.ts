import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { getNextBinDay, getNextFourBinDays } from '../../src/routes/bins/services/getNextBinDays'

describe('getNextBinDay', () => {
    test('should return bin on bin day', () => {
        const currentDate = new Date('2025-07-02')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-07-02'),
            type: 'rubbish',
            description: 'General waste collection',
        })
    })
    test('should return the next rubbish bin day the day before a bin date', () => {
        const currentDate = new Date('2025-07-01')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-07-02'),
            type: 'rubbish',
            description: 'General waste collection',
        })
    })
    test('should return the red next bin day the day before a bin date', () => {
        const currentDate = new Date('2025-07-08')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-07-09'),
            type: 'red bin',
            description: 'Recycling collection: glasses, cans, plastics, and cartons',
        })
    })
    test('should return the next red bin day the day after a bin date', () => {
        const currentDate = new Date('2025-07-03')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-07-09'),
            type: 'red bin',
            description: 'Recycling collection: glasses, cans, plastics, and cartons',
        })
    })
    test('should return the rubbish bin day the day after a bin date', () => {
        const currentDate = new Date('2025-07-11')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-07-16'),
            type: 'rubbish',
            description: 'General waste collection'
        })
    })
    test('should return the next blue bin day the day after a bin date', () => {
        const currentDate = new Date('2025-07-22')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-07-23'),
            type: 'blue bin',
            description: 'Recycling collection: paper and card'
        })
    })
    test('should return the rubbish bin day the day after a bin date', () => {
        const currentDate = new Date('2025-07-29')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-07-30'),
            type: 'rubbish',
            description: 'General waste collection'
        })
    })

    test('should return the next red bin day the day after a bin date', () => {
        const currentDate = new Date('2025-07-31')

        const result = getNextBinDay(currentDate)

        assert.deepEqual(result, {
            date: new Date('2025-08-06'),
            type: 'red bin',
            description: 'Recycling collection: glasses, cans, plastics, and cartons',
        })
    })
})
describe('getNextFourBinDays', () => {
    test('should return the next four bin days starting from 2025-07-01', () => {
        const startDate = new Date('2025-07-01')

        const result = getNextFourBinDays(startDate)

        assert.deepEqual(result, [
            {
                date: new Date('2025-07-02'),
                type: 'rubbish',
                description: 'General waste collection',
            },
            {
                date: new Date('2025-07-09'),
                type: 'red bin',
                description: 'Recycling collection: glasses, cans, plastics, and cartons',
            },
            {
                date: new Date('2025-07-16'),
                type: 'rubbish',
                description: 'General waste collection',
            },
            {
                date: new Date('2025-07-23'),
                type: 'blue bin',
                description: 'Recycling collection: paper and card',
            },
        ])
    })

    test('should return the next four bin days starting from a Wednesday', () => {
        const startDate = new Date('2025-07-02') // A Wednesday

        const result = getNextFourBinDays(startDate)

        assert.deepEqual(result, [
            {
                date: new Date('2025-07-02'),
                type: 'rubbish',
                description: 'General waste collection',
            },
            {
                date: new Date('2025-07-09'),
                type: 'red bin',
                description: 'Recycling collection: glasses, cans, plastics, and cartons',
            },
            {
                date: new Date('2025-07-16'),
                type: 'rubbish',
                description: 'General waste collection',
            },
            {
                date: new Date('2025-07-23'),
                type: 'blue bin',
                description: 'Recycling collection: paper and card',
            },
        ])
    })

    test('should return the next four bin days starting from a date after the initial schedule', () => {
        const startDate = new Date('2025-07-10') // After the first red bin day

        const result = getNextFourBinDays(startDate)

        assert.deepEqual(result, [
            {
                date: new Date('2025-07-16'),
                type: 'rubbish',
                description: 'General waste collection',
            },
            {
                date: new Date('2025-07-23'),
                type: 'blue bin',
                description: 'Recycling collection: paper and card',
            },
            {
                date: new Date('2025-07-30'),
                type: 'rubbish',
                description: 'General waste collection',
            },
            {
                date: new Date('2025-08-06'),
                type: 'red bin',
                description: 'Recycling collection: glasses, cans, plastics, and cartons',
            },
        ])
    })

    test('should return the next four bin days starting from a date far in the future', () => {
        const startDate = new Date('2025-08-15') // A Friday

        const result = getNextFourBinDays(startDate)

        assert.deepEqual(result, [
            {
                date: new Date('2025-08-20'),
                type: 'blue bin',
                description: 'Recycling collection: paper and card',
            },
            {
                date: new Date('2025-08-27'),
                type: 'rubbish',
                description: 'General waste collection',
            },
            {
                date: new Date('2025-09-03'),
                type: 'red bin',
                description: 'Recycling collection: glasses, cans, plastics, and cartons',
            },
            {
                date: new Date('2025-09-10'),
                type: 'rubbish',
                description: 'General waste collection',
            },
        ])
    })
})