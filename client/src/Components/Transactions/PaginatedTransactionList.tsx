import React from "react";
import { Transaction } from "../../Interface/interface";
import { useGlobalContext } from "../../Store/globalContext";
import TransactionList from "./TransactionList";

type TransactionType = {
  transaction: Transaction;
};

const PaginatedTransactionList: React.FC<TransactionType> = ({
  transaction,
}) => {
  const { data } = useGlobalContext();
  return <TransactionList transaction={transaction} />;
};

export default PaginatedTransactionList;
