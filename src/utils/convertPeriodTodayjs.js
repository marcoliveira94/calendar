import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const convertToDayjs = (periods) => {
  return periods.map((time) => {
    return time.map((period_time) => {
      return dayjs(period_time).utc().local()
    })
  })
}

export default convertToDayjs
