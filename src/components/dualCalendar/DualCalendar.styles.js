import styled from 'styled-components'
import colors from '../../constants/colors'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
`

export const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 30px;
    @media (max-width: 1768px) {
        top: 385px;
    }
`

export const Calendars = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 1768px) {
        flex-direction: column;
    }
`

export const DateWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export const Notification = styled.div`
    background-color: ${colors.primary};
    color: white;
    font-weight: bold;
`

export const Arrow = styled.div`
    visibility: ${props => !props.visible && props.left ? 'hidden' : 'initial'};
    cursor: pointer;
`

export const Clean = styled.div`
   text-decoration: underline;
   color:  ${colors.primary};
   cursor: pointer;
`

export const Error = styled.div`
    background-color:  ${colors.primary};
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Caption = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    margin: 10px;
    margin-bottom: 5px;
    & > div {
        margin-right: 10px;
        background-color: ${props => props.color};
        width: 10px;
        height:10px;
    }
`
