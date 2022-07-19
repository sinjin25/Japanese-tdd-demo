import { screen, render } from '@testing-library/react'
import InputConvert from './InputConvert'
import { test, expect} from '@jest/globals'

describe('InputConvert functionality', () => {
    test('it should have a default placeholder text', () => {
        render(<InputConvert />)
        const ele = screen.getByPlaceholderText(/type a word/i)
    })
    test('it should modify user text', () => {
        render(<InputConvert placeholderText="testtest" />)
        const ele = screen.getByPlaceholderText(/testtest/i)
    })
})