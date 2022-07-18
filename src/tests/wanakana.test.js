import {toHiragana, toKana, isMixed, is} from 'wanakana'
import { test, describe, expect } from '@jest/globals'

describe('Wanakana', () => {
    test('convert to hiragana', () => {
        expect(toHiragana('kikinagara')).toBe('ききながら')
        expect(toHiragana('kinki')).toBe('きんき')
        expect(toHiragana('kiniku')).toBe('きにく')
        // this nn behavior is expected for bind but not directly
        expect(toHiragana('kinnki')).not.toBe('きんき')
        expect(toHiragana('kinnniku')).not.toBe('きんにく')
        // check "strange" characters
        expect(toHiragana('tuduki')).toBe('つづき')
        expect(toHiragana('tsuduki')).toBe('つづき')
        // nope
        expect(toHiragana('tsutzuki')).toBe('つtずき')
    })
    test('convert text to katakana or hiragana', () => {
        expect(toKana('KIkinagara')).toBe('キきながら')
        expect(toKana('KInki')).toBe('キんき')
        expect(toKana('KIniku')).toBe('キにく')
        // this nn behavior is expected for bind but not directly
        expect(toKana('KInnki')).not.toBe('キんき')
        expect(toKana('KInnniku')).not.toBe('キんにく')
        // double check dash behavior
        expect(toKana('ke-ki')).toBe('けーき') // - is always katakana
        expect(toKana('KE-KI')).toBe('ケーキ')
        // double check mixed behavior
        // prefers hiragana
        expect(toKana('Ki')).toBe('き')
        expect(toKana('kI')).toBe('き')
    })
    test('identifying functions', () => {

    })
})