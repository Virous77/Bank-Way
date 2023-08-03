import { Aside } from "./side.content";
import { useLocation } from "react-router-dom";
import Quotes from "../Quotes/Quotes";
import Sidebar from "../Dashboard/Sidebar";
import TransactionSidebar from "../Transactions/TransactionSidebar";
import PaymentSidebar from "../MoneyPaid/PaymentSidebar";

const SideContent = () => {
  const { pathname } = useLocation();

  type ActiveTab = {
    [key: string]: {
      value: React.ReactElement;
    };
  };

  const Tabs: ActiveTab = {
    "/account": {
      value: <Quotes />,
    },
    "/": {
      value: <Sidebar />,
    },
    "/transaction": {
      value: <TransactionSidebar />,
    },
    "/transfer": {
      value: <PaymentSidebar />,
    },
  };
  const currentTab = Tabs[pathname || ""];

  return (
    <Aside $style={pathname}>{(currentTab && currentTab.value) || ""}</Aside>
  );
};

export default SideContent;
