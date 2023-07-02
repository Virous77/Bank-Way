import { formatDate } from "../../Utils/data";
import { Aside, List } from "./dashboard.style";
import TransactionList from "../Transactions/TransactionList";
import { useActivity } from "../../Store/ActivityContext";

const Sidebar = () => {
  const { data } = useActivity();

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
