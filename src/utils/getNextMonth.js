import { getToday } from './getToday'

const getNextMonth = (numberofMonths = 1) => {
  const today = getToday()
  const month = today.add(numberofMonths, 'month').month()
  const year = today.add(numberofMonths, 'month').format('YYYY')

  return [month, year]
}

export default getNextMonth
