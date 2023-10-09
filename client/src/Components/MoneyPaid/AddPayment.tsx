import { displayCol } from "../Common/variable.style";
import { PDiv } from "./money.style";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useGlobalContext } from "../../Store/globalContext";
import { CREATE_TRANSFER } from "../../graphql/transfer";
import {
  getLocalData,
  handleAction,
  validateTokenMessage,
} from "../../Utils/data";
import { useAuthContext } from "../../Store/AuthContext";

type AddPaymentType = {
  refetch: () => void;
};

const AddPayment: React.FC<AddPaymentType> = ({ refetch }) => {
  const initialState = {
    transfer_to: "",
    amount: 0,
    notes: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { transfer_to, amount, notes } = formData;
  const { logoutUser } = useAuthContext();

  const { handleSetNotification, setState, handleError } = useGlobalContext();
  const id = getLocalData("bankId");
  const token = getLocalData("bankToken");

  const [createTransfer, { loading }] = useMutation(CREATE_TRANSFER, {
    onError: (error) => {
      const validateError = validateTokenMessage(error.message);
      if (validateError) {
        logoutUser();
      }
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: () => {
      refetch();
      setState((prev) => ({ ...prev, show: "" }));
      setFormData(initialState);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPayment = () => {
    const data = {
      user_id: id,
      amount: +amount,
      transfer_to,
      notes,
      token,
    };

    try {
      handleAction({
        action: createTransfer,
        formData: data,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <PDiv $style={displayCol}>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <label>Transfer To</label>
          <input
            type="text"
            value={transfer_to}
            name="transfer_to"
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label>Add Note</label>
          <input
            type="text"
            name="notes"
            value={notes}
            onChange={handleChange}
          />
        </fieldset>

        <button onClick={handleAddPayment} disabled={loading}>
          {loading ? "Processing..." : "Add Payment"}
        </button>
      </form>
    </PDiv>
  );
};

export default AddPayment;
