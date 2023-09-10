import React from "react";

type HeaderType = {
  transactionType: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: {
    id: number;
    value: string;
    name: string;
  }[];
};

const Header: React.FC<HeaderType> = ({
  transactionType,
  handleChange,
  data,
}) => {
  return (
    <select value={transactionType} onChange={handleChange}>
      {data.map((type) => (
        <option value={type.value} key={type.id}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default Header;
