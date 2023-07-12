import { displayCenter } from "../Common/variable.style";
import { Aside, Card } from "./transaction.style";
import { BiSearch } from "react-icons/bi";
import { useGlobalContext } from "../../Store/globalContext";
import { useActivity } from "../../Store/ActivityContext";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { RiRefundLine } from "react-icons/ri";
import { TextThumb } from "../Shimmers/TextShimmer";

const TransactionSidebar = () => {
  const { state, setState } = useGlobalContext();

  const transactionDuration =
    state.days === "7" ? "Week" : state.days === "15" ? "15 Days" : "Month";

  const { data } = useActivity();
  const expense = data?.getAllActivity.data
    .filter((trans) => trans.type_name === "expense")
    .map((trans) => +trans.amount)
    .reduce((acc, curr) => acc + curr, 0);

  const income = data?.getAllActivity.data
    .filter((trans) => trans.type_name === "income")
    .map((trans) => +trans.amount)
    .reduce((acc, curr) => acc + curr, 0);
  const refund = data?.getAllActivity.data
    .filter((trans) => trans.type_name === "refund")
    .map((trans) => +trans.amount)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <Aside $style={displayCenter}>
      <header>
        <BiSearch size={21} />
        <input
          type="text"
          value={state.search}
          onChange={(e) => setState({ ...state, search: e.target.value })}
          placeholder="Search Transactions"
        />
      </header>

      <section>
        <h3>This {transactionDuration} Transactions</h3>
        <Card style={{ background: "#47A992" }}>
          <div>
            <GiReceiveMoney size={28} />
            <p>Income</p>
          </div>
          {data ? <h2>₹{income}</h2> : <TextThumb height={20} />}
        </Card>

        <Card style={{ background: "#FF6666" }}>
          <div>
            <GiPayMoney size={28} />
            <p>Expense</p>
          </div>
          {data ? <h2>₹{expense}</h2> : <TextThumb height={20} />}
        </Card>

        <Card style={{ background: "#E8AA42" }}>
          <div>
            <RiRefundLine size={28} />
            <p>Refund</p>
          </div>
          {data ? <h2>₹{refund}</h2> : <TextThumb height={20} />}
        </Card>
      </section>
    </Aside>
  );
};

export default TransactionSidebar;
