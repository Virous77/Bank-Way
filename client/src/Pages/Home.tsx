import SideMenu from "../Components/Layout/SideMenu";
import PageContent from "../Components/PageContent";
import { Main } from "../Components/Layout/home.style";
import SideContent from "../Components/SideContent/SideContent";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();
  const activeTab = pathname === "/settings";

  return (
    <Main $style={pathname}>
      <SideMenu />
      <PageContent />
      {!activeTab && <SideContent />}
    </Main>
  );
};

export default Home;
