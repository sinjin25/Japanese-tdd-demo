import { screen, render, debug } from '@testing-library/react'
import TestSample2 from './test-sample-2'
import { test, expect} from '@jest/globals'
import { BrowserRouter } from 'react-router-dom'

// fix using <Link> w/o react router dom
const MockComponent = ({n}) => {
    return (
    <BrowserRouter>
        <div>test</div>
        <TestSample2 numIncompleteTasks={n} />
    </BrowserRouter>
    )
}

test('Should render the correct num incomplete tasks', () => {
    render(<MockComponent n={5} />)
    const ele = screen.getByText(/[0-9] tasks remaining/)
    expect(ele).toBeVisible()
})

test('Should render "task" singular when num of incomplete tasks is 0', () => {
    const { toBeVisible } = render()
    render(<MockComponent n={1} />)
    const ele = screen.getByText(/1 task remaining/)
})