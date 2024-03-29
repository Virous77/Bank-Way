import { useNavigate, useLocation } from "react-router-dom";
import { Aside, List, Item, SAuthB } from "./home.style";
import { navLink } from "../../Utils/data";
import {
  displayCol,
  displayCenter,
  displayFlex,
} from "../Common/variable.style";
import { Button, Logo } from "./navbar.style";
import { useGlobalContext } from "../../Store/globalContext";
import { AiOutlineClose } from "react-icons/ai";
import { PrivateLinks } from "../Private/PtotectedRoutes";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuthContext } from "../../Store/AuthContext";

const SideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state, setState } = useGlobalContext();
  const { logoutUser } = useAuthContext();

  return (
    <Aside $style={state.menu} $styles={displayFlex}>
      <div>
        <Logo>Expensify</Logo>
        <button onClick={() => setState({ ...state, menu: "" })}>
          <AiOutlineClose />
        </button>
      </div>

      <List $style={displayCol}>
        {navLink.map((link) => (
          <Item
            key={link.id}
            $style={displayCenter}
            onClick={() => {
              navigate(link.link);
              setState({ ...state, menu: "" });
            }}
            $active={pathname === link.link ? true : false}
          >
            {<link.icon />} {link.name}
          </Item>
        ))}

        <SAuthB>
          <PrivateLinks>
            <Button $primary="var(--body-color)" onClick={logoutUser}>
              <AiOutlineLogout />
              Logout
            </Button>
          </PrivateLinks>
        </SAuthB>
      </List>
    </Aside>
  );
};

export default SideMenu;
