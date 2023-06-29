import { Aside } from "./side.content";
import { useLocation } from "react-router-dom";
import Quotes from "../Quotes/Quotes";
import Sidebar from "../Dashboard/Sidebar";

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
  };
  const currentTab = Tabs[pathname || ""];

  return <Aside>{(currentTab && currentTab.value) || ""}</Aside>;
};

export default SideContent;
