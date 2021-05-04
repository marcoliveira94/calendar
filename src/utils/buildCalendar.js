import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import Day from '../models/Day'
import utc from 'dayjs/plugin/utc'
import { getToday } from './getToday'
dayjs.extend(utc)

dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

const buildCalendar = ({ firstDay, month, startDate, endDate, availability }) => {
  const getWeekArray = (day) => {
    const firstDayOfWeek = day.subtract(day.day(), 'day')
    const weekArray = []

    for (let i = 0; i < 7; i++) {
      const day = new Day(firstDayOfWeek.add(i, 'day'), availability, currentMonthDate, startDate, endDate)
      weekArray.push(day)
    }

    return weekArray
  }

  const getMonthArray = (day) => {
    const currentDate = day.date()
    const firstDayOfMonth = day.subtract(currentDate - 1, 'day')

    const monthArray = []

    for (let i = 0; i < 6; i++) {
      const dd = firstDayOfMonth.add(i, 'week')
      monthArray.push(getWeekArray(dd))
    }

    return monthArray
  }

  const today = getToday()
  const defaultDay = firstDay || today
  const day = defaultDay.add(month, 'month')
  const currentMonthDate = (day)
  const monthArray = getMonthArray(day)
  const currentMonth = monthArray

  return { currentMonth, currentMonthDate }
}

export default buildCalendar
