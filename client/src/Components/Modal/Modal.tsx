import ReactDOM from "react-dom";
import React, { ReactNode } from "react";
import { ModalContent, Main } from "./modal.style";

type ModalType = {
  isOpen: string;
  onClose: () => void;
  children: ReactNode;
  size?: string;
};

export const Modal: React.FC<ModalType> = ({
  isOpen,
  onClose,
  children,
  size,
}) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Main onClick={onClose}>
      <ModalContent $modalSize={size} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Main>,
    document.getElementById("modal-root")!
  );
};
