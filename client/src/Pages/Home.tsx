import SideMenu from "../Components/Layout/SideMenu";
import PageContent from "../Components/PageContent";
import { Main } from "../Components/Layout/home.style";
import SideContent from "../Components/SideContent/SideContent";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../Store/globalContext";

const Home = () => {
  const { pathname } = useLocation();
  const activeTab = pathname === "/settings";
  const { state } = useGlobalContext();

  return (
    <Main $style={pathname}>
      <SideMenu />
      <PageContent />
      {!activeTab && !state.error && <SideContent />}
    </Main>
  );
};

export default Home;
