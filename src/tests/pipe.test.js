import {pipe, pipeMethod} from '../js/pipe'

describe('Pipe utility functionality', () => {
    test('Should work', () => {
        const a = (str) => str+'!'
        const b = (str) => str+'?'
        const inp = 'Hello'

        const pipeOutput = pipe(
            a,
            b
        )(inp)

        expect(pipeOutput).toBe('Hello!?')
    })
    
    test('Should be able to run standard str methods', () => {
        const inp = 'Test;test2;test3'

        const pipeOutput = pipe(
            pipeMethod('replace', /;/g, ', ')
        )(inp)

        expect(pipeOutput).toBe('Test, test2, test3')
    })
})