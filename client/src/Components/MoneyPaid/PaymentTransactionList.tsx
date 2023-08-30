import { Payments } from "../../Interface/interface";
import { displayFlex } from "../Common/variable.style";
import { PList, Wrap, PAction } from "./money.style";
import { RiSecurePaymentLine } from "react-icons/ri";
import { formatDate } from "../../Utils/data";
import { useState } from "react";
import { DELETE_TRANSFER } from "../../graphql/transfer";
import { useMutation } from "@apollo/client";
import { useGlobalContext } from "../../Store/globalContext";

type PaymentList = {
  payment: Payments;
  refetch: () => void;
};

const PaymentTransactionList: React.FC<PaymentList> = ({
  payment,
  refetch,
}) => {
  const [active, setActive] = useState("");
  const { handleSetNotification, handleError } = useGlobalContext();

  const [deleteTransfer, { loading }] = useMutation(DELETE_TRANSFER, {
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      refetch();
      handleSetNotification({
        message: data.deleteTransfer.message,
        status: "success",
      });
    },
  });

  const handleDelete = (id: string) => {
    try {
      deleteTransfer({
        variables: {
          id: id,
        },
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <PList>
      <Wrap
        $style={displayFlex}
        onClick={() => {
          if (active) {
            setActive("");
          } else {
            setActive(payment._id);
          }
        }}
      >
        <div>
          <b>
            <RiSecurePaymentLine size={30} /> {payment.transfer_to}
          </b>
          <p>Notes: {payment.notes}</p>
        </div>
        <h3>₹{payment.amount}</h3>
      </Wrap>
      {active === payment._id && (
        <PAction $style={displayFlex}>
          <p>
            Date:{" "}
            {formatDate(
              new Date(
                payment.createdAt.includes("T")
                  ? payment.createdAt
                  : Number(payment.createdAt)
              )
            )}
          </p>
          <button onClick={() => handleDelete(payment._id)} disabled={loading}>
            Delete
          </button>
        </PAction>
      )}
    </PList>
  );
};

export default PaymentTransactionList;
