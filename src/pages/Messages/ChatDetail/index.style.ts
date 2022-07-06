import styled from "styled-components";
import { Header as _Header, SubHeader as _SubHeader } from "../index.style";

export const Header = _Header
export const SubHeader = _SubHeader

export const Section = styled.div`
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`

export const ChatMessageContainer = styled.ol`
  list-style: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`

// export const ChatMessageListItem = styled.li<{ isMyMessage: boolean }>`
//   width: fit-content;
//   font-size: 16px;
//   max-width: 80%;
//   align-self: ${p => p.isMyMessage ? 'flex-end' : 'flex-start'};
//   div {
//     display: flex;
//     border: 1px solid black;
//     padding: 10px 20px;
//   }
// `

export const Footer = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50px;
  background-color: red;
`