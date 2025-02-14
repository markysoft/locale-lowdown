
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {BankHoliday, BankHolidaySchema} from '../../src/routes/bank-holidays/schemas/BankHoliday'

describe('Bank Holiday Schema', () => {
    it('Schema is defined', () => {
        assert.ok(BankHolidaySchema)
    })
    it('Schema parses valid object', () => {
        const bankHoliday: BankHoliday = BankHolidaySchema.parse({ title: 'Boxing Day', date: '2022-12-28', notes: 'Substitute day', bunting: true })
         assert.ok(bankHoliday)
         assert.equal(bankHoliday.title,'Boxing Day')
         assert.equal(bankHoliday.date.getFullYear(),2022)
        // because months are 0-indexed...
         assert.equal(bankHoliday.date.getMonth(),11)
         assert.equal(bankHoliday.date.getDate(),28)
         assert.equal(bankHoliday.dateString,'Wednesday 28 December 2022')
         assert.equal(bankHoliday.notes,'Substitute day')
         assert.equal(bankHoliday.bunting,true)
         assert.equal(bankHoliday.substituteDay,true)
    })
})