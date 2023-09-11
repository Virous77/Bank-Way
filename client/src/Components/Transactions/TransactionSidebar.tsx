import { displayCenter } from "../Common/variable.style";
import { Aside, Card } from "./transaction.style";
import { BiSearch } from "react-icons/bi";
import { useGlobalContext } from "../../Store/globalContext";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { RiRefundLine } from "react-icons/ri";
import { TextThumb } from "../Shimmers/TextShimmer";
import { useMemo, useState } from "react";
import Filter from "./Filter";
import FilterComp from "./FilterComp";
import { useQuery } from "@apollo/client";
import { FILTER_ACTIVITY } from "../../graphql/activity";

type Result = {
  filterActivity: {
    data: {
      amount: number;
      type_name: string;
    }[];
    message: string;
    status: number;
  };
};

const TransactionSidebar = () => {
  const { state, setState, handleSetNotification } = useGlobalContext();
  const [filterOption, setFilterOption] = useState(false);
  const [filterType, setFilterType] = useState("30");

  const transactionDuration =
    state.days === "7" ? "Week" : state.days === "15" ? "15 Days" : "Month";

  const input = {
    type: filterType,
  };

  const { data } = useQuery<Result>(FILTER_ACTIVITY, {
    variables: { input },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    fetchPolicy: "network-only",
  });

  const expense = useMemo(() => {
    return data?.filterActivity.data
      .filter((trans) => trans.type_name === "expense")
      .map((trans) => +trans.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }, [data]);

  const income = useMemo(() => {
    return data?.filterActivity.data
      .filter((trans) => trans.type_name === "income")
      .map((trans) => +trans.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }, [data]);

  const refund = useMemo(() => {
    return data?.filterActivity.data
      .filter((trans) => trans.type_name === "refund")
      .map((trans) => +trans.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }, [data]);

  const Total = expense && income && income - expense;

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
        <Filter setFilterOption={setFilterOption} filterOption={filterOption} />
      </header>
      {filterOption && (
        <FilterComp filterType={filterType} setFilterType={setFilterType} />
      )}

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

        <Card style={{ background: "var(--main-font-color)" }}>
          <div>
            <h2 style={{ color: "var(--body-color)" }}>Total</h2>
          </div>
          {data ? (
            <h2 style={{ color: "var(--body-color)" }}>{Total}₹</h2>
          ) : (
            <TextThumb height={20} />
          )}
        </Card>
      </section>
    </Aside>
  );
};

export default TransactionSidebar;
