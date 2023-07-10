import React from "react";

const Header = () => {
  return (
    <select>
      <option value="">Select Type</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
      <option value="refund">Refund</option>
    </select>
  );
};

export default Header;
