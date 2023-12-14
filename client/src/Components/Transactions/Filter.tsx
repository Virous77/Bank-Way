import { MdFilterList } from "react-icons/md";
import { FButton } from "./transaction.style";
import { displayAllCenter } from "../Common/variable.style";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type TFilter = {
  setFilterOption: React.Dispatch<React.SetStateAction<boolean>>;
  filterOption: boolean;
};

const Filter: React.FC<TFilter> = ({ setFilterOption, filterOption }) => {
  return (
    <React.Fragment>
      <FButton
        $style={displayAllCenter}
        onClick={() => setFilterOption(!filterOption)}
      >
        {!filterOption ? <MdFilterList /> : <AiOutlineClose />}
      </FButton>
    </React.Fragment>
  );
};

export default Filter;
