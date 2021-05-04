import dayjs from 'dayjs'
import produce from 'immer'
import { useReducer } from 'react'
import Calendar from '../calendar/Calendar'
import * as S from './DualCalendar.styles'
import AvailabilityData from '../../models/AvailabilityData'
import getCalendarEndDate from '../../utils/getCalendarEndDate'
import useFetch from 'use-http'
import utc from 'dayjs/plugin/utc'
import { getToday } from '../../utils/getToday'
import colors from '../../constants/colors'
dayjs.extend(utc)

const initialState = {
  startDate: undefined,
  endDate: undefined,
  availability: {
    available_periods: [],
    unavailable_periods: [],
    confirmed_inquiries: [],
    requested_inquiries: []
  },
  month: 0
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'setStartDate':
        draft.startDate = action.payload
        break
      case 'setEndDate':
        draft.endDate = action.payload
        break
      case 'setAvailability':
        draft.availability = action.payload
        break
      case 'nextMonth':
        draft.month++
        break
      case 'prevMonth':
        draft.month--
        break
      case 'clearPeriod':
        draft.startDate = undefined
        draft.endDate = undefined
        break
      default:
        draft = state
    }
  })

const DualCalendar = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { month, availability, startDate, endDate } = state
  const today = getToday()

  const onNewData = (_curr, response) => {
    const availability = new AvailabilityData(response.data)
    dispatch({ type: 'setAvailability', payload: availability })
  }

  const { error } = useFetch(`https://rnters-pr-161.herokuapp.com/api/items/21/availability?start_at=${today.format('YYYY/MM/DD')}&end_at=${getCalendarEndDate(month).format('YYYY/MM/DD')}&interval=true`, { onNewData }, [month])

  return (
    <S.Wrapper>
      {
            error && <S.Error>Ocorreu um erro por favor tente mais tarde</S.Error>
        }
      {!startDate && !endDate && <S.Notification>Selecione a data de levantamento</S.Notification>}
      {startDate && !endDate && <S.Notification>Alugar de {startDate.day.format('DD/MM/YYYY')} a: </S.Notification>}
      {startDate && endDate && <S.Notification>Alugar de {startDate.day.format('DD/MM/YYYY')} a {endDate.day.format('DD/MM/YYYY')} </S.Notification>}
      <S.Navigation>
        <S.Arrow role='button' left visible={month > 0} onClick={() => dispatch({ type: 'prevMonth' })}><i className='glyphicon glyphicon-chevron-left' /></S.Arrow>
        {startDate && <S.Clean role='button' onClick={() => dispatch({ type: 'clearPeriod' })}>Limpar seleção</S.Clean>}
        <S.Arrow role='button' onClick={() => dispatch({ type: 'nextMonth' })}> <i className='glyphicon glyphicon-chevron-right' /> </S.Arrow>
      </S.Navigation>
      <S.Calendars>
        <Calendar
          left
          state={state}
          dispatch={dispatch}
          month={month}
          availability={availability}
        />
        <Calendar
          state={state}
          dispatch={dispatch}
          month={month + 1}
          availability={availability}
        />
      </S.Calendars>
      <S.Caption color={colors.unavailable}><div /> Indisponivel</S.Caption>
      <S.Caption color={colors.confirmed}><div />Pedidos de disponibilidade onde o dono do item respondeu afirmativamente</S.Caption>
      <S.Caption color={colors.requested}><div />Pedidos de disponibilidade onde o dono ainda não respondeu</S.Caption>
      {startDate && endDate &&
        <div>
          <div className='items__quick_booking_container'>
            <button className='btn btn-primary'>Verificar Disponibilidade</button>
          </div>
        </div>}

    </S.Wrapper>
  )
}

export default DualCalendar
