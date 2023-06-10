import SideMenu from "../Components/Layout/SideMenu";
import PageContent from "../Components/PageContent";
import { Main } from "../Components/Layout/home.style";

const Home = () => {
  return (
    <Main>
      <SideMenu />
      <PageContent />
    </Main>
  );
};

export default Home;
