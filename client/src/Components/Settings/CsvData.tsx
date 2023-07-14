import { useActivity } from "../../Store/ActivityContext";
import { Main, CsvButton, CsvTab, Check } from "./settings.style";
import { CSVLink } from "react-csv";
import { useGlobalContext } from "../../Store/globalContext";
import { displayCenter } from "../Common/variable.style";
import { BsCheck } from "react-icons/bs";

const CsvData = () => {
  const { data } = useActivity();
  const { state, setState } = useGlobalContext();
  const { csvDataType } = state;

  const transactionDuration =
    state.days === "7" ? "Week" : state.days === "15" ? "15 Days" : "Month";

  const headers = [
    { label: "Transaction Name", key: "transaction" },
    { label: "Amount", key: "amount" },
    { label: "Date", key: "date" },
    { label: "Type", key: "type" },
  ];

  const csvData = data?.getAllActivity.data
    .filter((trans) => trans.type_name === state.csvDataType)
    .map((item) => ({
      transaction: item.type,
      amount: item?.amount,
      date: item.date.split("-").reverse().join("-"),
      type: item.type_name,
    }));

  const csvReport = {
    filename: `Transaction-${new Date().getDate()}.csv`,
    headers: headers,
    data: csvData,
  };

  return (
    <Main
      style={{
        padding: "1rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CsvTab $style={displayCenter}>
        <Check $style={displayCenter}>
          <span>All</span>
          <p onClick={() => setState({ ...state, csvDataType: "all" })}>
            {csvDataType === "all" && <BsCheck />}
          </p>
        </Check>

        <Check $style={displayCenter}>
          <span>Income</span>
          <p onClick={() => setState({ ...state, csvDataType: "income" })}>
            {csvDataType === "income" && <BsCheck />}
          </p>
        </Check>

        <Check $style={displayCenter}>
          <span>Expense</span>
          <p onClick={() => setState({ ...state, csvDataType: "expense" })}>
            {csvDataType === "expense" && <BsCheck />}
          </p>
        </Check>

        <Check $style={displayCenter}>
          <span>Refund</span>
          <p onClick={() => setState({ ...state, csvDataType: "refund" })}>
            {csvDataType === "refund" && <BsCheck />}
          </p>
        </Check>
      </CsvTab>
      <p>Download This {transactionDuration} Transactions.</p>
      <CsvButton>
        <CSVLink style={{ color: "green" }} {...csvReport}>
          Download
        </CSVLink>
      </CsvButton>
    </Main>
  );
};

export default CsvData;
