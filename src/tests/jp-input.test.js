import { convertToJp } from "../js/jp-input";
import {describe, test, expect} from '@jest/globals'
import { pipe } from '../js/pipe'
import {toKana} from 'wanakana'

describe('Test convertToJp util', () => {
    test('It should convert normally', () => {
        expect(convertToJp('kikinagara')).toBe('ききながら')
        expect(convertToJp('KE-ki')).toBe('ケーき')
    })
    test('It should handle edge cases', () => {
        // nn
        expect(convertToJp('nihon')).toBe('にほん')
        // custom nn behavior
        expect(convertToJp('nihonn')).toBe('にほん')
        expect(convertToJp('honto')).toBe('ほんと')
        expect(convertToJp('honnto')).toBe('ほんと')
        expect(convertToJp('kinnniku')).toBe('きんにく')
    })
    test('Works sequentially with Katakana', () => {
        // simulate kinnniku typing
        const addLetter = (letter) => (str) => {
            return str+letter
        }
        // override default behavior
        const convertOverride = (inp) => convertToJp(inp, false)

        // THE BUG IS THAT toKana WILL NOT KEEP CASE ON "NON-JAPANESE"
        //　This means: K => kI => き not キ
        // this means we needs separate function for handling !finalize
        // with hiragana and katakana
        // FIXME: Broken test w/ katakana
        expect(pipe(
            addLetter('K'),
            convertOverride,
            addLetter('I'),
            convertOverride,
            addLetter('N'),
            convertOverride,
            addLetter('N'),
            convertOverride,
            addLetter('N'),
            convertOverride,
            addLetter('I'),
            convertOverride,
            addLetter('K'),
            convertOverride,
            addLetter('U'),
            convertOverride,
        )('')).toBe('キンニク')
    })
    test('Works sequentially', () => {
        // simulate kinnniku typing
        const addLetter = (letter) => (str) => {
            return str+letter
        }
        // override default behavior
        const convertOverride = (inp) => convertToJp(inp, false)

        // test
        expect(toKana('KINNIKU')).toBe('キンニク')
        // simulate n issues (kinnniku)
        const simulation = pipe(
            addLetter('k'),
            convertOverride,
            addLetter('i'),
            convertOverride,
            addLetter('n'),
            convertOverride,
            addLetter('n'),
            convertOverride,
            addLetter('n'),
            convertOverride,
            addLetter('i'),
            convertOverride,
            addLetter('k'),
            convertOverride,
            addLetter('u'),
            convertOverride,
        )('')
        expect(simulation).toBe('きんにく')
    })
})