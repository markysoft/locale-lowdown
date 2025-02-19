
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {Departures, DeparturesSchema} from '../../src/routes/travel/services/trainTimes'
import { readFileSync } from 'node:fs'

describe('Bank Holiday Schema', () => {
    it('Schema is defined', () => {
        assert.ok(DeparturesSchema)
    })
    it('Schema parses valid object', () => {
        const departuresText = readFileSync(__dirname + '/../testdata/train-departures.json')
        const departuresJson = JSON.parse(departuresText.toString())
        const departures: Departures = DeparturesSchema.parse(departuresJson)
         assert.ok(departures)

    })
})