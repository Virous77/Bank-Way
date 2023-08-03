import { Payments } from "../../Interface/interface";

type PaymentList = {
  payment: Payments;
};

const PaymentTransactionList: React.FC<PaymentList> = ({ payment }) => {
  return <div>PaymentTransactionList</div>;
};

export default PaymentTransactionList;
