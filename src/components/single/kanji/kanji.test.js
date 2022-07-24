import { screen, render, fireEvent, debug } from '@testing-library/react'
import KanjiModel from '../../../model/kanji-model'
import Kanji from './Kanji'
import { test, expect, describe} from '@jest/globals'
import { BrowserRouter } from 'react-router-dom'

const kanji = new KanjiModel('好')
kanji.addDefinitions('fond of', 'like')
kanji.addReading('コウ')
const kanjiSample = kanji.consume()

describe('Kanji component test', () => {
    it('Should render properly', () => {
        render(<Kanji kanji={kanjiSample.label}
            defs={kanjiSample.data.definitions}
            readings={kanjiSample.data.readings}
            />)
        const ele = screen.getByTitle(/コウ/i)
        expect(ele.textContent).toBe('好')
    })
    it('Should show a tooltip on hover', async () => {
        render(<Kanji kanji={kanjiSample.label}
            defs={kanjiSample.data.definitions}
            readings={kanjiSample.data.readings}
            />)
        const ele = screen.getByTitle(/コウ/i)

        const tooltip = await screen.findByText(/fond of/)
        expect(tooltip).not.toBeVisible()
        
        fireEvent.mouseEnter(ele)
        expect(tooltip).toBeVisible()
    })
})