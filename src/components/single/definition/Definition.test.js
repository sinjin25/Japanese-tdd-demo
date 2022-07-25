import { screen, render } from '@testing-library/react'
import Definition from './Definition'
import { test, expect} from '@jest/globals'
import burnerWord from '../../../js/burner-word'

const mockComponent = () => {
    return (<Definition
        entries={burnerWord.consume()}
    />)
}

describe('Definition component', () => {
    test('Should be able to render multiple sub-entries', () => {
        const {container } = render(mockComponent())
        
        // a single entry
        const ele = screen.getByText(/her$/i)
        expect(ele).toBeInTheDocument()

        // multiple sub-entries, formatted as expect
        const ele2 = screen.getByText(/Girl, woman/i)
        expect(ele).toBeInTheDocument()

        // contains one part of speech per set of entries
        const ele3 = container.getElementsByClassName('definition-pos')
        expect(ele3.length).toBe(1)
    })
})