import { test, expect } from '@jest/globals'
import burnerWord from '../../js/burner-word'
import Word from './Word'
import { render, screen, fireEvent } from '@testing-library/react'
import Matchers from '../../tests/test-utils'

const mockComponent = () => {
    const data = burnerWord.consume()
    const data2 = burnerWord.consumeKanji()
    
    return (<Word
    label={burnerWord.kanji}
    data={data.data}
    kanjiInfo={data2}
    />)
}
describe('Word Component Integration test', () => {
    test('Should create popups', () => {
        render(mockComponent())
        const ele = screen.getByText('彼')
        const popup = screen.getByText('かの')
        expect(popup).toBeInTheDocument()
        expect(popup).not.toBeVisible()
        fireEvent.mouseEnter(ele)
        expect(popup).toBeVisible()
    })

    test('Should work with mixed kanji/kana', () => {
        
        render(mockComponent())
        const ele = screen.getByText('の')
        expect(ele).toBeInTheDocument()
    })
})