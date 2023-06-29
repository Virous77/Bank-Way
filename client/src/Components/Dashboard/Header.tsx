import { currentMoment } from "../../Utils/data";
import { useAuthContext } from "../../Store/AuthContext";
import { Head } from "./dashboard.style";

const Header = () => {
  const { userData } = useAuthContext();

  return (
    <Head>
      <div>
        <h1>{currentMoment(new Date())},</h1>
        <p>{userData?.name?.split(" ")[0]}</p>
      </div>
    </Head>
  );
};

export default Header;
