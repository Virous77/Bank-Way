import { Payments } from "../../Interface/interface";
import { displayFlex } from "../Common/variable.style";
import { PList } from "./money.style";
import { RiSecurePaymentLine } from "react-icons/ri";

type PaymentList = {
  payment: Payments;
};

const PaymentTransactionList: React.FC<PaymentList> = ({ payment }) => {
  return (
    <PList $style={displayFlex}>
      <div>
        <b>
          <RiSecurePaymentLine size={30} /> {payment.transfer_to}
        </b>
        <p>Notes: {payment.notes}</p>
      </div>

      <h3>₹{payment.amount}</h3>
    </PList>
  );
};

export default PaymentTransactionList;
