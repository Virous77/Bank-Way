import { useNavigate, useLocation } from "react-router-dom";
import { Aside, List, Item } from "./home.style";
import { navLink } from "../../Utils/data";
import {
  displayCol,
  displayCenter,
  displayFlex,
} from "../Common/variable.style";
import { Logo } from "./navbar.style";
import { useGlobalContext } from "../../Store/globalContext";
import { AiOutlineClose } from "react-icons/ai";

const SideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state, setState } = useGlobalContext();

  return (
    <Aside $style={state.menu} $styles={displayFlex}>
      <div>
        <Logo>BankWay</Logo>
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
      </List>
    </Aside>
  );
};

export default SideMenu;
