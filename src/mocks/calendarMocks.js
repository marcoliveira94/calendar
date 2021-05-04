import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { getToday } from '../utils/getToday'
dayjs.extend(utc)

const availabilityMocks = {
  availablePeriods: [[
    dayjs('2021-05-01').utc().local(),
    dayjs('2021-05-10').utc().local()
  ],
  [
    dayjs('2021-05-16').utc().local(),
    dayjs('2021-05-31').utc().local()
  ]],
  confirmedInquiries: [],
  requestedInquiries: [],
  unavailablePeriods: [
    [
      dayjs('2021-05-11').utc().local(),
      dayjs('2021-05-15').utc().local()
    ]
  ]
}

const stateMock = {
  endDate: undefined,
  month: 0,
  startDate: undefined
}
const day = getToday().format('2021-05-01')

const dispatch = jest.fn()

export const calendarPropsMock = {
  availability: availabilityMocks,
  firstDay: dayjs(day).utc().local(),
  month: 0,
  state: stateMock,
  dispatch: dispatch
}
