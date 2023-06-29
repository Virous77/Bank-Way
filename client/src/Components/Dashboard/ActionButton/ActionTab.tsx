import { WrapTab, Tab } from "./action.style";
import { useGlobalContext } from "../../../Store/globalContext";

const ActionTab = () => {
  const { state, setState } = useGlobalContext();
  return (
    <WrapTab>
      <Tab
        style={{ background: "#FF6666" }}
        onClick={() => setState({ ...state, show: "Expense" })}
      >
        Add Expense
      </Tab>
      <Tab
        style={{ background: "#47A992" }}
        onClick={() => setState({ ...state, show: "Income" })}
      >
        Add Income
      </Tab>
      <Tab
        style={{ background: "#E8AA42" }}
        onClick={() => setState({ ...state, show: "Refund" })}
      >
        Add Refund
      </Tab>
    </WrapTab>
  );
};

export default ActionTab;
