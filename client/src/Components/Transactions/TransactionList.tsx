import { Transaction } from "../../Interface/interface";
import { LI } from "./transaction.style";

type TransactionListType = {
  transaction: Transaction;
};

const TransactionList: React.FC<TransactionListType> = ({ transaction }) => {
  return <LI>TransactionList</LI>;
};

export default TransactionList;
