import { displayFlex } from "../Common/variable.style";
import { Main } from "../Settings/settings.style";
import { PayHeader } from "./money.style";
import { useGlobalContext } from "../../Store/globalContext";
import AddPayment from "./AddPayment";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import PaymentTransaction from "./PaymentTransaction";
import { getLocalData } from "../../Utils/data";
import { GET_ALL_TRANSFER } from "../../graphql/transfer";
import { useQuery } from "@apollo/client";
import { Payments } from "../../Interface/interface";
import useAppTitle from "../../hooks/useAppTitle";

type PaymentResponse = {
  getTransferAll: {
    data: Payments[];
  };
};

const MoneyPaid = () => {
  useAppTitle({ name: "Transfer" });
  const { setState, state, handleSetNotification } = useGlobalContext();
  const id = getLocalData("bankId");

  const { data, loading, refetch } = useQuery<PaymentResponse | undefined>(
    GET_ALL_TRANSFER,
    {
      variables: { id },
      onError: (error) => {
        handleSetNotification({ message: error.message, status: "error" });
      },
      onCompleted: (data) => {
        if (data) {
          setTimeout(() => {
            setState({ ...state, payment: data.getTransferAll.data });
          }, 100);
        }
      },
      fetchPolicy: id ? "cache-and-network" : "standby",
    }
  );

  return (
    <Main>
      <PayHeader $style={displayFlex}>
        <h2>Transfer</h2>
        <button onClick={() => setState({ ...state, show: "payment" })}>
          Add Payment
        </button>
      </PayHeader>
      <PaymentTransaction
        data={data?.getTransferAll.data}
        loading={loading}
        refetch={refetch}
      />

      {state.show === "payment" && (
        <Modal
          isOpen="isOpen"
          onClose={() => setState({ ...state, show: "" })}
          size="500px"
        >
          <ModalHeader
            name="Add Payment"
            onClose={() => setState({ ...state, show: "" })}
          />
          <AddPayment refetch={refetch} />
        </Modal>
      )}
    </Main>
  );
};

export default MoneyPaid;
