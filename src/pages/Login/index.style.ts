import styled from 'styled-components'
import { fillViewportHeight, flexCenter } from '../../styles/common'

export const Container = styled.main`
  ${fillViewportHeight}
  ${flexCenter}
`

export const Form = styled.form`
  display: grid;
  width: 100%;
  max-width: 300px;
  grid-row-gap: 20px;
`

export const Input = styled.input`
  width: 100%;
  height: 30px;
`