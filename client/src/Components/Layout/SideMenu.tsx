import { useNavigate, useLocation } from "react-router-dom";
import { Aside, List, Item } from "./home.style";
import { navLink } from "../../Utils/data";
import { displayCol, displayCenter } from "../Common/variable.style";

const SideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Aside>
      <List $style={displayCol}>
        {navLink.map((link) => (
          <Item
            key={link.id}
            $style={displayCenter}
            onClick={() => navigate(link.link)}
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
