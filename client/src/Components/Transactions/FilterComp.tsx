import React from "react";
import { FilterDiv } from "./transaction.style";
import Header from "./Header";
import { filterTransactionData } from "../../Utils/data";
import { displayCenter } from "../Common/variable.style";

type TFilterComp = {
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
};

const FilterComp: React.FC<TFilterComp> = ({ filterType, setFilterType }) => {
  return (
    <FilterDiv $style={displayCenter}>
      <p>Filter Transaction :</p>
      <Header
        data={filterTransactionData}
        transactionType={filterType}
        handleChange={(e) => setFilterType(e.target.value)}
      />
    </FilterDiv>
  );
};

export default FilterComp;
