import styled from 'styled-components'

export const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${p => p.visible ? 'flex' : 'none'};
  z-index: 1000;
`

export const Body = styled.div`
  width: 300px;
  height: auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
`