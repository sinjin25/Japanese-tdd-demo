import {describe, test, expect} from '@jest/globals'
import FlowGen from '../js/flow-generator'

describe('Test flow-generator', () => {

    test('should be able to pass parameters and get answer', () => {
        const returnSmth = (a, b) => {
            return a+b
        }
        const returnSmth2 = (a, b) => {
            return a+b
        }
        
        const uwu = new FlowGen(returnSmth, returnSmth2)
        expect(uwu.iterate(15,20)).toBe(35)
        expect(uwu.iterate('a', 'b')).toBe('ab')
        expect(uwu.iterate(20, 30)).toBe(50)
    })
})