import { render, screen, waitFor } from '@testing-library/react'
import DualCalendar from './DualCalendar'
import MockDate from 'mockdate'
import userEvent from '@testing-library/user-event'
import MockedResponse from '../../mocks/mockData'
import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import getNextMonth from '../../utils/getNextMonth'
import colors from '../../constants/colors'
import { Months } from '../../constants/months'

global.fetch = require('jest-fetch-mock')
global.fetchMock = global.fetch
dayjs.extend(utc)

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify(MockedResponse))
})

afterEach(() => {
  MockDate.reset()
  fetch.resetMocks()
})

describe('DualCalendar', () => {
  it('selects a  period', async () => {
    render(<DualCalendar />)

    const startDate = screen.getAllByText('5')
    const endDate = screen.getAllByText('8')
    const otherEndDate = screen.getAllByText('9')

    await waitFor(() => expect(startDate[0]).not.toHaveStyle(`background-color: ${colors.unloaded}`))
    expect(startDate[0]).toHaveStyle(`background-color: ${colors.confirmed}`)

    userEvent.click(startDate[0])
    userEvent.click(endDate[0])

    await waitFor(() => expect(endDate[0]).not.toHaveStyle(`background-color: ${colors.unloaded}`))
    expect(startDate[0]).toHaveStyle(`background-color: ${colors.primary}`)
    expect(endDate[0]).toHaveStyle(`background-color: ${colors.primary}`)

    userEvent.click(otherEndDate[0])

    await waitFor(() => expect(otherEndDate[0]).not.toHaveStyle(`background-color: ${colors.unloaded}`))
    expect(otherEndDate[0]).toHaveStyle(`background-color: ${colors.primary}`)

    userEvent.click(startDate[0])
    await waitFor(() => expect(startDate[0]).not.toHaveStyle(`background-color: ${colors.primary}`))
  })

  it('navigate between month', async () => {
    render(<DualCalendar />)
    const nextArrow = screen.getAllByRole('button')[0]

    expect(nextArrow).toBeInTheDocument()

    userEvent.click(nextArrow)
    const [month, year] = getNextMonth(2)

    const monthHeader = screen.getByText(`${Months[month]} - ${year}`)
    expect(monthHeader).toBeInTheDocument()

    const prevArrow = screen.getAllByRole('button')[1]
    userEvent.click(prevArrow)

    const [cmonth, cyear] = getNextMonth(2)
    const currentMonthHeader = screen.getByText(`${Months[month]} - ${cyear}`)
    expect(currentMonthHeader).toBeInTheDocument()
  })
})
