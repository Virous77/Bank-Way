import React from "react";
import { ITransaction } from "../../Interface/interface";
import TransactionList from "./TransactionList";

type TTransaction = {
  transaction: ITransaction;
};

const PaginatedTransactionList: React.FC<TTransaction> = ({ transaction }) => {
  return <TransactionList transaction={transaction} />;
};

export default PaginatedTransactionList;
