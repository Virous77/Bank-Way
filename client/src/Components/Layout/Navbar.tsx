import { NavbarMain, Logo, RightContainer, Circle } from "./navbar.style";
import { displayCenter } from "../Common/variable.style";
import img from "../../assets/react.svg";
import ThemeProvider from "../../Theme/ThemeProvider";
import { PrivateLinks, PublicLinks } from "../Private/PtotectedRoutes";
import NavAuth from "./NavAuth";
import { Button } from "./navbar.style";
import { getLocalData } from "../../Utils/data";
import { useGlobalContext } from "../../Store/globalContext";
import { useAuthContext } from "../../Store/AuthContext";

const Navbar = () => {
  const { setState, state } = useGlobalContext();
  const active = getLocalData("bankId");
  const { data } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("bankId");
    setState({ ...state, isLoggedIn: false });
  };

  return (
    <NavbarMain $displayCenter={displayCenter}>
      <Logo>BankWay</Logo>

      <RightContainer $displayCenter={displayCenter}>
        <ThemeProvider />

        <PrivateLinks>
          <Circle>
            <img src={img} alt="img" />
          </Circle>
        </PrivateLinks>

        {!active && !state.isLoggedIn && (
          <PublicLinks>
            <NavAuth />
          </PublicLinks>
        )}

        <PrivateLinks>
          <Button $primary="var(--body-color)" onClick={handleLogout}>
            Logout
          </Button>
        </PrivateLinks>
      </RightContainer>
    </NavbarMain>
  );
};

export default Navbar;
