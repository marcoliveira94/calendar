import CalendarDay from '../calendarDay/CalendarDay'
import useCalendar from '../../utils/buildCalendar'
import { memo, useCallback } from 'react'
import * as S from './Calendar.styles'
import { Months } from '../../constants/months'

function Calendar ({ availability, firstDay, month = 0, state, dispatch, left }) {
  const { startDate, endDate } = state
  const { currentMonth, currentMonthDate } = useCalendar({ firstDay, month, startDate, endDate, availability })

  const handleClick = useCallback((day) => {
    if (startDate && endDate) {
      // 3th click
      if (startDate && day.day.format('DD/MM/YYYY') === startDate.day.format('DD/MM/YYYY')) {
        // if day is before endDate
        dispatch({ type: 'setStartDate', payload: undefined })
        dispatch({ type: 'setEndDate', payload: undefined })
      } else {
        // if day is after endDate
        dispatch({ type: 'setEndDate', payload: day })
      }
    } else if (startDate && !endDate) {
      // 2th click
      dispatch({ type: 'setEndDate', payload: day })
    } else if (!startDate && !endDate) {
      // 1th click
      dispatch({ type: 'setStartDate', payload: day })
    }
  }, [dispatch, endDate, startDate])

  const renderWeek = (week, idx) => {
    return (
      <S.CalendarTemplate key={idx} role='row'>
        {week.map((day, i) => {
          return (
            <CalendarDay
              left={left}
              key={i}
              date={day}
              preSelected={startDate && !endDate && day.day.format('DD/MM/YYYY') === startDate.day.format('DD/MM/YYYY')}
              onClick={() => handleClick(day)}
            />
          )
        }
        )}

      </S.CalendarTemplate>
    )
  }

  return (
    <S.Wrapper>
      <S.Month>
        <h3>{currentMonthDate && Months[currentMonthDate.month()]} - {currentMonthDate && currentMonthDate.format('YYYY')}</h3>
      </S.Month>
      <S.CalendarTemplate role='row'>
        <S.CalendarHeaderDay role='gridcell'>D</S.CalendarHeaderDay>
        <S.CalendarHeaderDay role='gridcell'>S</S.CalendarHeaderDay>
        <S.CalendarHeaderDay role='gridcell'>T</S.CalendarHeaderDay>
        <S.CalendarHeaderDay role='gridcell'>Q</S.CalendarHeaderDay>
        <S.CalendarHeaderDay role='gridcell'>Q</S.CalendarHeaderDay>
        <S.CalendarHeaderDay role='gridcell'>S</S.CalendarHeaderDay>
        <S.CalendarHeaderDay role='gridcell'>S</S.CalendarHeaderDay>
      </S.CalendarTemplate>
      <S.Week style={{ display: 'grid' }}>
        {currentMonth.map((week, i) => {
          return renderWeek(week, i)
        })}
      </S.Week>

    </S.Wrapper>
  )
}

export default memo(Calendar)
