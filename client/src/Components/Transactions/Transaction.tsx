import { Main, PUL } from "./transaction.style";
import Header from "./Header";
import { displayCol, displayFlex } from "../Common/variable.style";
import { useGlobalContext } from "../../Store/globalContext";
import { useQuery } from "@apollo/client";
import { GET_PAGINATED_ACTIVITY } from "../../graphql/activity";
import { useState } from "react";
import { Transaction } from "../../Interface/interface";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginatedTransactionList from "./PaginatedTransactionList";
import { TransactionShimmer } from "../Shimmers/TextShimmer";

const Transactions = () => {
  const { handleSetNotification } = useGlobalContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionType, setTransactionType] = useState("all");
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 20;

  const input = {
    pageNumber,
    pageSize,
    type: transactionType,
  };

  const { loading } = useQuery(GET_PAGINATED_ACTIVITY, {
    variables: { input },
    onCompleted: (data) => {
      setTransactions(transactions.concat(data.getPaginatedActivity.data));
      setTotal(data.getPaginatedActivity.total);
    },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    fetchPolicy: "network-only",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(e.target.value);
    setTransactions([]);
  };

  return (
    <Main $style={displayFlex}>
      <header>
        <h2>Transaction</h2>
        <Header transactionType={transactionType} handleChange={handleChange} />
      </header>
      <section>
        {transactions.length === 0 && loading ? (
          <TransactionShimmer />
        ) : (
          <InfiniteScroll
            dataLength={transactions?.length + 1}
            next={() => setPageNumber(pageNumber + 1)}
            hasMore={transactions?.length === total ? false : true}
            loader={transactions.length > 1 && <TransactionShimmer />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {transactions?.length > 0 && <b></b>}
              </p>
            }
          >
            <PUL $style={displayCol}>
              {transactions.map((tran) => (
                <PaginatedTransactionList key={tran.id} transaction={tran} />
              ))}
            </PUL>
          </InfiniteScroll>
        )}
      </section>
    </Main>
  );
};

export default Transactions;
