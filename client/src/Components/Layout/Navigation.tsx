import { Main, List, ListItem } from "./navigation.style";
import { navLink } from "../../Utils/data";
import { displayFlex } from "../Common/variable.style";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Store/globalContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { state } = useGlobalContext();
  const { pathname } = useLocation();

  return (
    <Main $style={state.menu}>
      <List $style={displayFlex}>
        {navLink.map((value) => (
          <ListItem
            key={value.id}
            onClick={() => {
              navigate(value.link);
              //   setState({ ...state, menu: "" });
            }}
            $active={pathname === value.link ? true : false}
          >
            {" "}
            {<value.icon />}{" "}
          </ListItem>
        ))}
      </List>
    </Main>
  );
};

export default Navigation;
