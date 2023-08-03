import { useQuery } from "@apollo/client";
import PaymentTransactionList from "./PaymentTransactionList";
import { GET_ALL_TRANSFER } from "../../graphql/transfer";
import { useGlobalContext } from "../../Store/globalContext";
import { getLocalData } from "../../Utils/data";
import { Payments } from "../../Interface/interface";
import { Main } from "./money.style";
import { displayCol } from "../Common/variable.style";
import { TransactionShimmer } from "../Shimmers/TextShimmer";

type PaymentResponse = {
  getTransferAll: {
    data: Payments[];
  };
};

const PaymentTransaction = () => {
  const { handleSetNotification } = useGlobalContext();
  const id = getLocalData("bankId");

  const { data, loading } = useQuery<PaymentResponse | undefined>(
    GET_ALL_TRANSFER,
    {
      variables: { id },
      onError: (error) => {
        handleSetNotification({ message: error.message, status: "error" });
      },
      fetchPolicy: id ? "cache-and-network" : "standby",
    }
  );

  if (loading) return <TransactionShimmer margin="1rem" />;

  return (
    <Main $style={displayCol}>
      {data &&
        data.getTransferAll.data.map((payment) => (
          <PaymentTransactionList key={payment.id} payment={payment} />
        ))}
    </Main>
  );
};

export default PaymentTransaction;
