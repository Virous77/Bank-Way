import SideMenu from "../Components/Layout/SideMenu";
import PageContent from "../Components/PageContent";
import { Main } from "../Components/Layout/home.style";
import SideContent from "../Components/SideContent/SideContent";

const Home = () => {
  return (
    <Main>
      <SideMenu />
      <PageContent />
      <SideContent />
    </Main>
  );
};

export default Home;
