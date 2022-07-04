import { css } from 'styled-components';

export const textEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

/**
 * 100vh For IOS Safari
 */
export const fillViewportHeight = css`
  height: 100vh;
  @supports (-webkit-appearance: none) and (stroke-color: transparent) {
    height: -webkit-fill-available;
  }
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`