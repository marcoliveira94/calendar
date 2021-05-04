import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 50%;
    margin-inline: 10px;
    @media (max-width: 1768px) {
        width: 100%;
        margin-block: 20px;
    }
`

export const Month = styled.div`
    display: flex;
    justify-content: center;
`

export const Week = styled.div`
    display: grid;
`

export const CalendarTemplate = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
`

export const CalendarHeaderDay = styled.div`
    margin: 10px;
    height: 30px;
`
