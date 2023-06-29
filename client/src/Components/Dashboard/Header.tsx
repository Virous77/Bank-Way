import { currentMoment } from "../../Utils/data";
import { useAuthContext } from "../../Store/AuthContext";
import { Head } from "./dashboard.style";
import Action from "./ActionButton/Action";
import { displayFlex } from "../Common/variable.style";

const Header = () => {
  const { userData } = useAuthContext();

  return (
    <Head $style={displayFlex}>
      <div>
        <h1>{currentMoment(new Date())},</h1>
        <p>{userData?.name?.split(" ")[0]}</p>
      </div>

      <Action />
    </Head>
  );
};

export default Header;
