import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(isBetween)

const isBetWeenPeriods = (day, periods) => {
  const isBetween = periods && periods.reduce((ac, period) => {
    if (day.isBetween(period[0], period[1], []) || day.utc().local().format('DD/MM/YYYY') === period[0].utc().local().format('DD/MM/YYYY') || day.utc().local().format('DD/MM/YYYY') === period[1].utc().local().format('DD/MM/YYYY')) {
      return (true)
    }

    return ac
  }, false)
  return isBetween
}

export default isBetWeenPeriods
