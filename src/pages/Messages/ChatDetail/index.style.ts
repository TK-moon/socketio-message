import styled from "styled-components";
import { Header as _Header, SubHeader as _SubHeader } from "../index.style";

export const Header = _Header
export const SubHeader = _SubHeader

export const Section = styled.div`
  position: relative;
`

export const Footer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50px;
  background-color: red;
`