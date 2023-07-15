import React from "react";
import { Transaction } from "../../Interface/interface";
import TransactionList from "./TransactionList";

type TransactionType = {
  transaction: Transaction;
};

const PaginatedTransactionList: React.FC<TransactionType> = ({
  transaction,
}) => {
  return <TransactionList transaction={transaction} />;
};

export default PaginatedTransactionList;
