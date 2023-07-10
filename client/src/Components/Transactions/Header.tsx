import React from "react";

type HeaderType = {
  transactionType: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Header: React.FC<HeaderType> = ({ transactionType, handleChange }) => {
  return (
    <select value={transactionType} onChange={handleChange}>
      <option value="all">Select Type</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
      <option value="refund">Refund</option>
    </select>
  );
};

export default Header;
