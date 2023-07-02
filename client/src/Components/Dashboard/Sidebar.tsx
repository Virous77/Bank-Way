import { useQuery } from "@apollo/client";
import { formatDate } from "../../Utils/data";
import { GET_ALL_ACTIVITY } from "../../graphql/activity";
import { useGlobalContext } from "../../Store/globalContext";
import { getLocalData } from "../../Utils/data";
import { useEffect } from "react";
import { Aside, List } from "./dashboard.style";
import { Transaction } from "../../Interface/interface";
import TransactionList from "../Transactions/TransactionList";

type Result = {
  getAllActivity: {
    data: Transaction[];
    message: string;
    status: number;
  };
};

const Sidebar = () => {
  const { handleSetNotification, state } = useGlobalContext();
  const id = getLocalData("bankId");
  const input = {
    id,
    count: 5,
  };
  const { refetch, data, loading } = useQuery<Result>(GET_ALL_ACTIVITY, {
    variables: { input },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    context: { clientName: "endpoint2" },
  });

  useEffect(() => {
    if (state.fetch === "five") {
      refetch();
    }
  }, [state.fetch]);

  return (
    <Aside>
      <header>
        <p>{formatDate(new Date())}</p>
      </header>

      <List>
        {data?.getAllActivity.data?.map((transaction) => (
          <TransactionList key={transaction.id} transaction={transaction} />
        ))}
      </List>
    </Aside>
  );
};

export default Sidebar;
