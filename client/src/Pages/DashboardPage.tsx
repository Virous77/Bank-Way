import Dashboard from "../Components/Dashboard/Dashboard";
import Expense from "../Components/Dashboard/UserActivity/Expense";
import Income from "../Components/Dashboard/UserActivity/Income";
import Refund from "../Components/Dashboard/UserActivity/Refund";
import { useGlobalContext } from "../Store/globalContext";

type ActiveTab = {
  [key: string]: {
    value: React.ReactElement;
  };
};

const DashboardPage = () => {
  const { state } = useGlobalContext();

  const activeTab: ActiveTab = {
    Expense: {
      value: <Expense />,
    },
    Income: {
      value: <Income />,
    },
    Refund: {
      value: <Refund />,
    },
  };

  return (
    <Dashboard
      Compo={state.show && activeTab[state.show].value}
      title={state.show.length > 0 ? state.show : "none"}
    />
  );
};

export default DashboardPage;
