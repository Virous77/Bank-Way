import { Aside } from "./side.content";
import { useLocation } from "react-router-dom";
import Quotes from "../Quotes/Quotes";
import Sidebar from "../Dashboard/Sidebar";
import TransactionSidebar from "../Transactions/TransactionSidebar";

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
  };
  const currentTab = Tabs[pathname || ""];

  return <Aside>{(currentTab && currentTab.value) || ""}</Aside>;
};

export default SideContent;
