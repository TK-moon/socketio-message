import styled from "styled-components";

export const ChatMessageListItem = styled.li<{ isMyMessage: boolean }>`
  width: fit-content;
  font-size: 16px;
  max-width: 80%;
  align-self: ${p => p.isMyMessage ? 'flex-end' : 'flex-start'};
  div {
    display: flex;
    border: 1px solid black;
    padding: 10px 20px;
  }
`