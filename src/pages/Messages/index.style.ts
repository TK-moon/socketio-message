import styled from 'styled-components'
import { fillViewportHeight } from '../../styles/common'

export const Container = styled.main`
  display: grid;
  grid-template-columns: 300px 1fr;
  ${fillViewportHeight};
`

export const Panel = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: 1px solid #efefef;
  nav {
    overflow-x: inherit;
    overflow-y: inherit;
  }
`

export const Header = styled.header`
  border-bottom: 1px solid #000;
  height: 50px;
`

export const SubHeader = styled.header`
  position: sticky;
  height: 50px;
  background-color: red;
  top: 0;
`