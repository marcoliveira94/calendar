import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { getToday } from './getToday'
dayjs.extend(utc)

const today = getToday()

const getCalendarEndDate = (month) => {
  const firstDayOfThisMonth = today.subtract(today.date() - 1, 'day').add(month, 'month')
  const daysInNextMonth = firstDayOfThisMonth.add(1, 'month').daysInMonth()
  const lastDayOfNextMonth = firstDayOfThisMonth.add(1, 'month').add(daysInNextMonth - 1, 'day')
  return lastDayOfNextMonth
}

export default getCalendarEndDate
