import { Main, PUL, NDiv } from "./transaction.style";
import Header from "./Header";
import { displayCol, displayFlex } from "../Common/variable.style";
import { useGlobalContext } from "../../Store/globalContext";
import { useQuery } from "@apollo/client";
import { GET_PAGINATED_ACTIVITY } from "../../graphql/activity";
import { useEffect, useState } from "react";
import { Transaction } from "../../Interface/interface";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginatedTransactionList from "./PaginatedTransactionList";
import { TransactionShimmer } from "../Shimmers/TextShimmer";
import noTransaction from "../../assets/no-transaction.svg";
import useAppTitle from "../../hooks/useAppTitle";
import { filterAllTransactionData, getLocalData } from "../../Utils/data";

const Transactions = () => {
  useAppTitle({ name: "Transaction" });
  const { handleSetNotification, state, setState } = useGlobalContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionType, setTransactionType] = useState("all");
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 20;
  const user_id = getLocalData("bankId");

  const input = {
    pageNumber,
    pageSize,
    type: transactionType,
    search: state.search.length > 3 ? state.search : "",
    user_id,
  };

  const { loading } = useQuery(GET_PAGINATED_ACTIVITY, {
    variables: { input },
    onCompleted: (data) => {
      if (state.search.length > 0) {
        setTransactions(data.getPaginatedActivity.data);
      } else {
        setTransactions(transactions.concat(data.getPaginatedActivity.data));
      }

      setTotal(data.getPaginatedActivity.total);
    },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    fetchPolicy: "network-only",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageNumber(1);
    setState({ ...state, search: "" });
    setTransactionType(e.target.value);
    setTransactions([]);
  };

  useEffect(() => {
    if (state.search.length > 3) {
      setTransactions([]);
    }
  }, [state.search]);

  return (
    <Main $style={displayFlex}>
      <header>
        <h2>Transaction</h2>
        <Header
          transactionType={transactionType}
          handleChange={handleChange}
          data={filterAllTransactionData}
        />
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
            {transactions.length > 0 ? (
              <PUL $style={displayCol}>
                {transactions.map((tran) => (
                  <PaginatedTransactionList key={tran._id} transaction={tran} />
                ))}
              </PUL>
            ) : (
              <NDiv>
                <img src={noTransaction} alt="no-transaction" />
                <p>Start tracking your daily spend.</p>
              </NDiv>
            )}
          </InfiniteScroll>
        )}
      </section>
    </Main>
  );
};

export default Transactions;
