import { displayFlex } from "../Common/variable.style";
import { Main } from "../Settings/settings.style";
import { PayHeader } from "./money.style";
import { useGlobalContext } from "../../Store/globalContext";
import AddPayment from "./AddPayment";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import PaymentTransaction from "./PaymentTransaction";
import {
  getLocalData,
  handleGlobalError,
  validateTokenMessage,
} from "../../Utils/data";
import { GET_ALL_TRANSFER } from "../../graphql/transfer";
import { useQuery } from "@apollo/client";
import { IPayments } from "../../Interface/interface";
import useAppTitle from "../../hooks/useAppTitle";
import { useAuthContext } from "../../Store/AuthContext";
import PullToRefresh from "react-simple-pull-to-refresh";

type TPaymentResponse = {
  getTransferAll: {
    data: IPayments[];
  };
};

const MoneyPaid = () => {
  useAppTitle({ name: "Transfer" });
  const {
    setState,
    state,
    handleSetNotification,
    refetch: stateRefetch,
  } = useGlobalContext();
  const id = getLocalData("bankId");
  const token = getLocalData("bankToken");
  const { logoutUser } = useAuthContext();

  const input = {
    id,
    token,
  };

  const { data, loading, refetch } = useQuery<TPaymentResponse | undefined>(
    GET_ALL_TRANSFER,
    {
      variables: { input },
      onError: (error) => {
        const validateError = validateTokenMessage(error.message);
        if (validateError) {
          logoutUser();
        }
        handleGlobalError({
          error: error.message,
          handleSetNotification: handleSetNotification,
          setState: setState,
        });
      },
      onCompleted: (data) => {
        if (data) {
          setTimeout(() => {
            setState({ ...state, payment: data.getTransferAll.data });
          }, 100);
        }
      },
      fetchPolicy: id ? "cache-first" : "standby",
    }
  );

  const handleRefresh = async () => {
    refetch();
    stateRefetch();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
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
    </PullToRefresh>
  );
};

export default MoneyPaid;
