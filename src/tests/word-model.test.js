import { test, expect } from '@jest/globals'
import {Word, WordEntry} from '../model/word-model'

describe('Word Model', () => {
    let word
    const READING = 'たべる'
    const POS = 'Ichidan verb, Transitive verb'
    const DEFS = [
        'to eat​',
        'to live on (e.g. a salary); to live off; to subsist on​'
    ]
    beforeEach(() => {
        word = new Word('食べる')
    })

    test('Can append readings', () => {
        let lookingAt
        word.appendReading(READING, 99)
        // it is empty
        lookingAt = word.data[READING]
        expect(lookingAt.data.length).toBe(0)

        // add entries
        word.appendDefinition(READING, POS, DEFS)

        expect(lookingAt.data.length).toBe(1)
        expect(lookingAt.data[0].pos).toBe(POS)
        expect(lookingAt.data[0].definitions.length).toBe(2)
    })
    test('Can append multiple', () => {
        expect(
            () => { word.appendReading('たべる') }
        ).toThrow(/importance/)

        word.appendReading('たべる', 99)
        word.appendReading('たべる2', 999)
        expect(Object.keys(word.data).length).toBe(2)

        expect(
            () => { word.appendReading('たべる')}
        ).toThrow(/duplicate/)
    })
    test.todo('Entries are sorted by "importance"')
    test('Can consume?', () => {
        word.appendReading(READING, 99)
        word.appendDefinition(READING, POS, DEFS)

        // should create a fresh copy to prevent mutation
        expect(word.consume().length).toBe(word.sorting.length)
    })
})

describe('Test WordEntry model', () => {
    let entry
    const READING = 'たべる'
    const POS = 'Ichidan verb, Transitive verb'
    const DEFS = [
        'to eat​',
        'to live on (e.g. a salary); to live off; to subsist on​'
    ]
    beforeEach(() => {
        entry = new WordEntry(99)
    })

    test('It should start empty', () => {
        expect(entry.data.length).toBe(0)
        expect(entry.importance).toBe(99)
    })

    test('It should support adding entries', () => {
        entry.append(POS, DEFS)
        expect(entry.data[0].pos).toBe(POS)
        expect(entry.data[0].definitions).toBe(DEFS)

        expect(
            () => {
                entry.append('asdfasdf', [])
            }
        ).toThrow(/empty definition/)

        expect(() => { entry.append(undefined, [])})
        .toThrow(/incorrect type/)

        expect(() => { entry.append('asdf', undefined)})
        .toThrow(/incorrect type/)
    })
})