import { Payments } from "../../Interface/interface";
import { displayFlex } from "../Common/variable.style";
import { PList, Wrap, PAction } from "./money.style";
import { RiSecurePaymentLine } from "react-icons/ri";
import { formatDate, getLocalData, handleAction } from "../../Utils/data";
import { useState } from "react";
import { DELETE_TRANSFER, UPDATE_TRANSFER } from "../../graphql/transfer";
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
  const user_id = getLocalData("bankId");
  const token = getLocalData("bankToken");

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

  const [updateTransfer, { loading: isLoading }] = useMutation(
    UPDATE_TRANSFER,
    {
      onError: (error) => {
        handleSetNotification({ message: error.message, status: "error" });
      },
      onCompleted: (data) => {
        refetch();
        handleSetNotification({
          message: data.updateTransfer.message,
          status: "success",
        });
      },
    }
  );

  const handleDelete = (id: string) => {
    const data = {
      user_id,
      token,
      id,
    };
    try {
      handleAction({
        action: deleteTransfer,
        formData: data,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const handleUpdate = (params: Payments) => {
    const isConfirm = window.confirm(
      "Are you sure have received this payment?"
    );

    const data = {
      id: params._id,
      isCompleted: true,
      token,
      user_id,
    };

    try {
      if (isConfirm) {
        handleAction({
          action: updateTransfer,
          formData: data,
        });
      }
    } catch (error: any) {
      console.log(error);
      handleError(error.message);
    }
  };

  return (
    <PList $isDone={payment.isCompleted ? "true" : "false"}>
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

          <div>
            {!payment?.isCompleted && (
              <button
                style={{ background: "#47a992" }}
                onClick={() => handleUpdate(payment)}
                disabled={isLoading}
              >
                Done
              </button>
            )}

            <button
              onClick={() => handleDelete(payment._id)}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </PAction>
      )}
    </PList>
  );
};

export default PaymentTransactionList;
