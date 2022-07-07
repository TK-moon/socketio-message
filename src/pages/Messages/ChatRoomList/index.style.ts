import styled from "styled-components";
import { Header as _Header, SubHeader as _SubHeader } from "../index.style";

export const Header = styled(_Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`
export const SubHeader = _SubHeader

export const ModalBody = styled.div`
  ul {
    display: grid;
    grid-gap: 5px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 18px;
  border-bottom: 1px solid #efefef;
`

export const ModalFooter = styled.footer`
  display: flex;
  padding: 10px 0;
`