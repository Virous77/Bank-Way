import PaymentTransactionList from "./PaymentTransactionList";
import { Payments } from "../../Interface/interface";
import { Main } from "./money.style";
import { displayCol } from "../Common/variable.style";
import { TransactionShimmer } from "../Shimmers/TextShimmer";
import React from "react";
import { NDiv } from "../Transactions/transaction.style";
import noTransaction from "../../assets/no-transaction.svg";

type PaymentTransactionType = {
  data: Payments[] | undefined;
  loading: boolean;
  refetch: () => void;
};

const PaymentTransaction: React.FC<PaymentTransactionType> = ({
  data,
  loading,
  refetch,
}) => {
  if (loading) return <TransactionShimmer margin="1rem" />;

  return (
    <Main
      $style={displayCol}
      style={{ background: data?.length === 0 ? "transparent" : "" }}
    >
      {data && data.length > 0 ? (
        <>
          {data?.map((payment) => (
            <PaymentTransactionList
              key={payment.id}
              payment={payment}
              refetch={refetch}
            />
          ))}
        </>
      ) : (
        <NDiv style={{ width: "90%" }}>
          <img src={noTransaction} alt="no-transaction" />
          <p>Start tracking your daily spend.</p>
        </NDiv>
      )}
    </Main>
  );
};

export default PaymentTransaction;
