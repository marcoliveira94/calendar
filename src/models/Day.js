import dayjs from 'dayjs'
import isBetWeenPeriods from '../utils/isBetWeenPeriods'
import utc from 'dayjs/plugin/utc'
import { getToday } from '../utils/getToday'
dayjs.extend(utc)

const getNextUnavailable = (day, unavailablePeriods) => {
  const sorted = unavailablePeriods && unavailablePeriods.filter((period) => period[0].isAfter(day)).sort((periodA, periodB) => {
    return periodA[0].diff(day) - periodB[0].diff(day)
  })
  if (!sorted.length) {
    return false
  }
  return sorted[0][0]
}

const today = getToday()

const isSelected = (day, startDate, endDate) => {
  return ((endDate && startDate && day.isBetween(startDate.day, endDate.day)) ||
      (startDate && day.format('DD/MM/YYYY') === startDate.day.format('DD/MM/YYYY')) ||
      (endDate && day.format('DD/MM/YYYY') === endDate.day.format('DD/MM/YYYY')))
}

const isDisabled = (day, currentMonthDate, startDate, unavailablePeriods) => {
  if (!day || !currentMonthDate) return true
  const nextUnavailable = (startDate && getNextUnavailable(startDate.day, unavailablePeriods))
  return ((currentMonthDate.month() !== day.month()) ||
      (day.isBefore(today))) ||
      (startDate && day.isBefore(startDate.day)) ||
      (startDate && nextUnavailable && day.isAfter(nextUnavailable))
}

function Day (day, availability, currentMonthDate, startDate, endDate) {
  const { availablePeriods, confirmedInquiries, unavailablePeriods, requestedInquiries } = availability
  this.day = day.utc().local()
  this.isAvailable = isBetWeenPeriods(day, availablePeriods)
  this.isConfirmed = isBetWeenPeriods(day, confirmedInquiries)
  this.isUnavailable = isBetWeenPeriods(day, unavailablePeriods)
  this.isRequested = isBetWeenPeriods(day, requestedInquiries)
  this.isDisabled = isDisabled(day, currentMonthDate, startDate, unavailablePeriods)
  this.isSelected = isSelected(day, startDate, endDate)
}

export default Day
