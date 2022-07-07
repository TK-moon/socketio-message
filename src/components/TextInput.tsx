import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const Input = styled.input<{ block: boolean; height: number; pill: boolean }>`
  display: block;
  /* width: ${(p) => p.width}; */
  width: ${(p) => (p.block ? "100%" : "fit-content")};
  height: ${(p) => `${p.height}px`};
  border: 1px solid #bbb;
  border-radius: ${(p) => (p.pill ? `${p.height / 2}px` : "5px")};
  outline: none;
  padding: 0 5px;
  overflow: hidden;
  :focus {
    background-color: #f5f5f5;
    & + span {
      transform: scale(1);
    }
  }
`;

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean;
  height?: number;
  pill?: boolean;
}

const TextInput = (props: TextInputProps) => {
  const { block, height = 40, pill = false, ...rest } = props;

  return <Input block={block || false} height={height} pill={pill} {...rest} />;
};

export default TextInput;
