import burnerWord from '../js/burner-word'
import { checkAnswer } from '../js/question-util'

describe('Test question-utils', () => {
    test('Should fail when not handed correct params', () => {
        expect(() => {
            checkAnswer(15)
        }).toThrow(/type/i)

        expect(() => {
            checkAnswer({
                input: 'test',
                key: burnerWord // passed in incorrectly
            })
        }).toThrow(/type/i)

        /* expect(() => {
            checkAnswer("test", {})
        }).toThrow(/instance of Word/i) */

        expect(() => {
            checkAnswer({
                input: 'something',
                key: 'fakeKey',
                model: burnerWord
            })
        }).toThrow(/key(.*?)not found/i)
    })

    test('Should be able to identify a correct reading', () => {
        const word = burnerWord
        expect(checkAnswer({
            input: 'かのじょ',
            model: burnerWord
        })).toBe(true)

        expect(checkAnswer({
            input: 'あらららぎ',
            model: burnerWord
        })).toBe(false)
    })

    test('Should be able to identify a correct definition', () => {
        expect(checkAnswer({
            input: 'girlfriend',
            key: 'かのじょ',
            model: burnerWord
        })).toBe(true)

        expect(checkAnswer({
            input: 'girl',
            key: 'かのじょ',
            model: burnerWord
        })).toBe(true)

        expect(checkAnswer({
            input: 'fail',
            key: 'かのじょ',
            model: burnerWord
        })).toBe(false)
    })
})