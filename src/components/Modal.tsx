import { ReactNode } from "react";
import { createPortal } from "react-dom";
import * as Style from "./Modal.style";

const Modal = ({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
}) => {
  const Element = (
    <Style.Container visible={visible}>
      <Style.Body>{children}</Style.Body>
    </Style.Container>
  );

  const rootElement = document.getElementById("portalRoot") as HTMLElement;
  return createPortal(Element, rootElement);
};

export default Modal;
