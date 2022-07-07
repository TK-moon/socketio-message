import styled, { keyframes } from "styled-components";
import { Header as _Header, SubHeader as _SubHeader } from "../index.style";

const SpinKeyframe = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Header = styled(_Header)`
  display: flex;
  align-items: center;
  padding: 0 10px;
`
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

export const Footer = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  padding: 10px;
  form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
    align-items: center;
  }
`

export const LoadingObserverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

export const LoadingSpinner = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  animation-name: ${SpinKeyframe};
  animation-duration: 2000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  :before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid black;
    content: '';
  }
  :after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: rotate(45deg);
    border: 1px solid black;
    content: '';
  }
`;