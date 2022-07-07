import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const ButtonContainer = styled.button<{ block: boolean }>`
  width: ${(p) => (p.block ? "100%" : "fit-content")};
  height: auto;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  :disabled {
    background-color: #585858;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, block, ...rest } = props;
  return (
    <ButtonContainer block={block || false} {...rest}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
