import { useAuthContext } from "../../Store/AuthContext";

const Home = () => {
  const { handleUpdateUser } = useAuthContext();
  return <div onClick={handleUpdateUser}>Home cool</div>;
};

export default Home;
