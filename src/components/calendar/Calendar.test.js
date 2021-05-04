import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import colors from '../../constants/colors'
import { calendarPropsMock } from './../../mocks/calendarMocks'
import Calendar from './Calendar'

describe('Calendar', () => {
  it('renders calendar grid', () => {
    render(<Calendar {...calendarPropsMock} />)
    const elements = screen.getAllByRole('gridcell')
    expect(elements.length).toBe(49)
  })

  it('render unavailable periods', () => {
    render(<Calendar {...calendarPropsMock} />)
    const elements = screen.getAllByText(/^\D*(?<p>11|12|13|14|15)\D*/)
    expect(elements.length).toBe(5)

    elements.forEach((el) => {
      expect(el).toHaveStyle(`background-color: ${colors.unavailable}`)
      expect(el).toHaveStyle(`color: ${colors.black}`)
    })
  })

  it('render available periods', () => {
    render(<Calendar {...calendarPropsMock} />)
    const elements = screen.getAllByText(/^\D*(?<p>16|17|18)\D*/)
    elements.forEach((el) => {
      expect(el).toHaveStyle(`background-color: ${colors.white}`)
      expect(el).toHaveStyle(`color: ${colors.black}`)
    })
    expect(elements.length).toBe(3)
  })

  it('handle click', () => {
    const dispatchMock = jest.fn()
    calendarPropsMock.dispatch = dispatchMock
    render(<Calendar {...calendarPropsMock} />)
    const element = screen.getByText(/^\D*(?<p>16)\D*/)
    expect(element).toBeInTheDocument()
    userEvent.click(element)
    expect(dispatchMock).toBeCalled()
  })
})
