
import { memo } from 'react'
import * as S from './CalendarDay.styles'
const CalendarDay = ({ date, onClick, preSelected, left }) => {
  const { day, isSelected, isAvailable, isConfirmed, isRequested, isUnavailable } = date

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isAvailable || isRequested || isSelected || isConfirmed) {
      onClick()
    }
  }

  const getTooltip = () => {
    if (isUnavailable) {
      return 'indisponivel'
    } else if (isConfirmed) {
      return 'confirmado'
    } else if (isRequested) {
      return 'requerido'
    }
  }

  return (
    <S.Wrapper date={date}>
      <S.Day
        tooltip={getTooltip()}
        left={left}
        role='gridcell'
        onClick={handleClick}
        key={day.date()}
        preSelected={preSelected}
        date={date}
      >
        {day.date()}
      </S.Day>
    </S.Wrapper>
  )
}

const parseProps = (props) => {
  const { date, ...restProps } = props
  const { day, ...rest } = date
  const newProps = {
    date: rest,
    dayNumber: day.date(),
    ...restProps
  }
  return JSON.stringify(newProps)
}
function shouldMemo (prevProps, nextProps) {
  // compares only date number and selection state an availability
  if (parseProps(prevProps) === parseProps(nextProps)) {
    return true
  }

  return false
}

export default memo(CalendarDay, shouldMemo)
