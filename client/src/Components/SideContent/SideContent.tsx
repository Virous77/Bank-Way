import { Aside } from "./side.content";
import { useLocation } from "react-router-dom";
import Quotes from "../Quotes/Quotes";

const SideContent = () => {
  const { pathname } = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tabs: any = {
    "/account": {
      value: Quotes,
    },
  };
  const currentTab = Tabs[pathname || ""];

  return <Aside>{(currentTab && <currentTab.value />) || ""}</Aside>;
};

export default SideContent;
