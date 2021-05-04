import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import CalendarDay from './CalendarDay'
import userEvent from '@testing-library/user-event'
import colors from '../../constants/colors'

describe('calendarDay', () => {
  const date = {
    day: dayjs(),
    isAvailable: false,
    isConfirmed: false,
    isDisabled: false,
    isRequested: false,
    isSelected: undefined,
    isUnavailable: false
  }

  it('renders number', () => {
    render(
      <CalendarDay
        date={date}
        onClick={() => {}}
        preSelected={false}
      />
    )

    const linkElement = screen.getByText(date.day.date())
    expect(linkElement).toBeInTheDocument()
  })

  it('show select color', () => {
    date.isSelected = true
    render(
      <CalendarDay
        date={date}
        onClick={() => {}}
        preSelected={false}
      />
    )

    const element = screen.getByText(date.day.date())
    expect(element).toHaveStyle(`background-color: ${colors.primary}`)
  })

  it('show disabled color', () => {
    date.isSelected = false
    date.isDisabled = true
    render(
      <CalendarDay
        date={date}
        onClick={() => {}}
        preSelected={false}
      />
    )

    const element = screen.getByText(date.day.date())
    expect(element).toHaveStyle('background-color: white')
    expect(element).toHaveStyle(`color: ${colors.disabled}`)
  })

  it('show confirmed color', () => {
    date.isSelected = false
    date.isDisabled = false
    date.isConfirmed = true
    render(
      <CalendarDay
        date={date}
        onClick={() => {}}
        preSelected={false}
      />
    )

    const element = screen.getByText(date.day.date())
    expect(element).toHaveStyle(`background-color: ${colors.confirmed}`)
  })

  it('handles Click', () => {
    const clickFn = jest.fn()
    render(
      <CalendarDay
        date={date}
        onClick={clickFn}
        preSelected={false}
      />
    )

    const element = screen.getByText(date.day.date())
    userEvent.click(element)
    expect(clickFn).toBeCalledTimes(1)
  })
})
