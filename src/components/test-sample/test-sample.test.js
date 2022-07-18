import { screen, render } from '@testing-library/react'
import TestSample from './test-sample'
import { test, expect} from '@jest/globals'
import Matchers from '../../tests/test-utils'

test('render text passed into name prop', () => {
    render(<TestSample name="Rick James" />)
    const headingElement = screen.getByText(/a card/i)
    expect(headingElement).toBeInTheDocument()
    const nameElement = screen.getByText(/rick james/i)
})

test('It should render a ', () => {
    render(<TestSample name="Rick James" />)
    screen.get
    const cardIntroEle = screen.getByRole('heading',
    {
        name: 'A card'
    })
    expect(cardIntroEle).toBeInTheDocument()

    const cardName = screen.getByRole('heading', {
        name: /rick james/i
    })
    expect(cardName).toBeInTheDocument()

    const btn = screen.getByTitle('thebtn')
})

// work with findBy
test('it should render a ', async () => {
    render(<TestSample name="Steve" />)

    const headingElement = await screen.findByText(/steve/i)
    expect(headingElement).toBeInTheDocument()
})

// negative test
test('it should render a ', () => {
    render(<TestSample name="Steve" />)

    // cannot use getBy or findBy because they wille error
    const headingElement = screen.queryByText(/waddup/i)
    expect(headingElement).not.toBeInTheDocument()
})

