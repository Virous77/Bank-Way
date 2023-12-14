import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ModalHead, MediumHeading, Button } from "./modal.style";

type TModalHeader = {
  name: string;
  onClose: () => void;
};

const ModalHeader: React.FC<TModalHeader> = ({ name, onClose }) => {
  return (
    <ModalHead>
      <MediumHeading>{name}</MediumHeading>

      <Button>
        <AiOutlineClose cursor="pointer" size={20} onClick={onClose} />
      </Button>
    </ModalHead>
  );
};

export default ModalHeader;
