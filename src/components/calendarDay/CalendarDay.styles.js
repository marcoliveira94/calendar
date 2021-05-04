import styled from 'styled-components'
import colors from '../../constants/colors'

const getColor = (date) => {
  const { isSelected, isDisabled, isAvailable, isUnavailable, isConfirmed, isRequested } = date

  if (isDisabled) {
    return colors.disabled
  } else if (isSelected && !isUnavailable) {
    return colors.white
  } else if (isUnavailable || isConfirmed || isRequested || isAvailable) {
    return colors.black
  } else {
    return colors.unloaded
  }
}

const getBg = (date, preSelected) => {
  const { isSelected, isDisabled, isAvailable, isUnavailable, isConfirmed, isRequested } = date

  if (isDisabled) {
    return 'white'
  } else if (isUnavailable) {
    return colors.unavailable
  } else if (preSelected) {
    return colors.preSelected
  } else if (isSelected) {
    return colors.primary
  } else if (isConfirmed) {
    return colors.confirmed
  } else if (isRequested) {
    return colors.requested
  } else if (isAvailable) {
    return colors.white
  } else {
    return colors.unloaded
  }
}

export const Day = styled.div`
    font-size: 10px;
    padding: 12px;
    display: flex;
    justify-content: center; 
    align-items: center;
    margin: 10px; 
    width: 20px; 
    height: 20px;
    border-radius: 100px;
    cursor: pointer;
    color: ${props => getColor(props.date)};
    background-color: ${props => getBg(props.date, props.preSelected)};
    :after {
      content:  "${props => props.tooltip}";
      opacity:0;
      transition: 0.1s all;
      position: absolute;
      width: 300px;
      display: flex;
      justify-content: center;
      top: -10px;
      color: ${props => getBg(props.date, false)};
      filter:   saturate(200%);
      font-weight: bold;
      transform:  ${props => props.left ? 'translate(30px)' : 'translate(-30px)'} ;
      z-index: 100;
    }
    &&:hover:after {
      opacity:1;
      transition-delay: 0.4s; 
    }
`

export const Tooltip = styled.span`
    color: red;
    position: absolute;
    bottom: 40px;
    left: -100%;
    display: none;
    z-index: 30;
    width: 30px;
    font-weight: bold;
`

export const Wrapper = styled.div`
position: relative;

`
