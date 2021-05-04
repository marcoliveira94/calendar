import dayjs from 'dayjs'
import buildCalendar from '../buildCalendar'

const calendarProps = {
  firstDay: undefined,
  month: 0,
  startDate: undefined,
  endDate: undefined,
  availability: {
    available_periods: [],
    confirmed_inquiries: [],
    requested_inquiries: [],
    unavailable_periods: []
  }
}

describe('buildCalendar', () => {
  it('should return an array of days', () => {
    const { currentMonth } = buildCalendar(calendarProps)
    expect(currentMonth.length).toBeDefined()
    const firstDay = currentMonth[0][0]
    expect(dayjs.isDayjs(firstDay.day)).toBe(true)
    expect(Object.keys(firstDay).sort()).toEqual(['day', 'isAvailable', 'isConfirmed', 'isUnavailable', 'isRequested', 'isDisabled', 'isSelected'].sort())
  })
})
