import { useQuery } from "@apollo/client";
import PaymentTransactionList from "./PaymentTransactionList";
import { GET_ALL_TRANSFER } from "../../graphql/transfer";
import { useGlobalContext } from "../../Store/globalContext";
import { getLocalData } from "../../Utils/data";
import { Payments } from "../../Interface/interface";

type PaymentResponse = {
  getTransferAll: {
    data: Payments[];
  };
};

const PaymentTransaction = () => {
  const { handleSetNotification } = useGlobalContext();
  const id = getLocalData("bankId");

  const { data } = useQuery<PaymentResponse | undefined>(GET_ALL_TRANSFER, {
    variables: { id },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    fetchPolicy: id ? "cache-and-network" : "standby",
  });

  return (
    <main>
      {data &&
        data.getTransferAll.data.map((payment) => (
          <PaymentTransactionList key={payment.id} payment={payment} />
        ))}
    </main>
  );
};

export default PaymentTransaction;
