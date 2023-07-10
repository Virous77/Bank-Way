import { Main } from "./transaction.style";
import Header from "./Header";
import { displayFlex } from "../Common/variable.style";
import { useGlobalContext } from "../../Store/globalContext";
import { useQuery } from "@apollo/client";
import { GET_PAGINATED_ACTIVITY } from "../../graphql/activity";
import { useState } from "react";
import { Transaction } from "../../Interface/interface";
import InfiniteScroll from "react-infinite-scroll-component";

const Transactions = () => {
  const { data, handleSetNotification } = useGlobalContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 1;

  const input = {
    pageNumber,
    pageSize,
  };

  const { loading } = useQuery(GET_PAGINATED_ACTIVITY, {
    variables: { input },
    onCompleted: (data) => {
      setTransactions(transactions.concat(data.getPaginatedActivity.data));
    },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
  });

  return (
    <Main $style={displayFlex}>
      <header>
        <h2>Transaction</h2>
        <Header />
      </header>
      <section>
        <InfiniteScroll
          dataLength={transactions?.length + 1}
          next={() => setPageNumber(pageNumber + 1)}
          hasMore={transactions?.length === 2 ? false : true}
          loader={
            transactions.length > 1 && (
              <div className="globalCenter">Loading...</div>
            )
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              {transactions?.length > 0 && <b></b>}
            </p>
          }
        >
          {transactions.map((tran) => (
            <div key={tran.id}>{tran.amount}</div>
          ))}
        </InfiniteScroll>
      </section>
    </Main>
  );
};

export default Transactions;
