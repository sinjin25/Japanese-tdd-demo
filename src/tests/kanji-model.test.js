import KanjiModel from '../model/kanji-model'
import { test, expect, describe } from '@jest/globals'

describe('KanjiModel test', () => {
    let word = '好'
    const READING = 'すき'
    const DEFS = [
        'fond',
        'pleasing',
        'liking something'
    ]
    test('It should be creatable', () => {
        const model = new KanjiModel(word)
        expect(model.kanji).toBe(word)
    })
    test('Test readings', () => {
        const model = new KanjiModel(word)
        // add one
        model.addReading(READING)
        expect(model.data.readings.length).toBe(1)
        // errors
        expect(() => {
            model.addReading(READING)
        }).toThrowError(/duplicate/)
        expect(() => {
            model.addReading('')
        }).toThrowError(/zero/)
        expect(() => {
            model.addReading(undefined)
        }).toThrowError(/type/)
    })
    test('Test definitions', () => {
        const model = new KanjiModel(word)
        // add one
        let returned = model.addDefinitions(DEFS[0])
        expect(returned.length).toBe(1)
        // add multiple, one duplicate no error
        const result = model.addDefinitions(...[DEFS[0], DEFS[1], DEFS[2]])
        expect(result.length).toBe(2)
        expect(model.data.definitions.length).toBe(3)
        expect(model.data.definitions.slice(-1)[0]).toBe(DEFS[2])
        // errors
        expect(() => {
            model.addDefinitions(DEFS[0])
        }).toThrowError(/duplicate/)
        expect(() => {
            model.addDefinitions('')
        }).toThrowError(/zero/)
        expect(() => {
            model.addDefinitions(undefined)
        }).toThrowError(/type/)
    })
    test('Can be consumed', () => {
        const model = new KanjiModel(word)
        model.addDefinitions(...DEFS)
        model.addReading(READING)

        const data = model.consume()

        const EXPECTED_KEYS = ['label', 'data']
        const EXPECT_DATA_KEYS = ['readings', 'definitions']
        expect(Object.keys(data))
        .toEqual(expect.arrayContaining(EXPECTED_KEYS))
        expect(Object.keys(data.data))
        .toEqual(expect.arrayContaining(EXPECT_DATA_KEYS))
        
        expect(data.data.readings.length).toBe(1)
        expect(data.data.definitions.length).toBe(3)
    })
})