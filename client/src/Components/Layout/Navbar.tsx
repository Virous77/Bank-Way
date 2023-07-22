import {
  NavbarMain,
  Logo,
  RightContainer,
  Circle,
  Img,
  Menu,
  LogoConta,
  AuthB,
} from "./navbar.style";
import { displayAllCenter, displayCenter } from "../Common/variable.style";
import ThemeProvider from "../../Theme/ThemeProvider";
import { PrivateLinks, PublicLinks } from "../Private/PtotectedRoutes";
import NavAuth from "./NavAuth";
import { Button } from "./navbar.style";
import { getLocalData } from "../../Utils/data";
import { useGlobalContext } from "../../Store/globalContext";
import { useAuthContext } from "../../Store/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import defaultUser from "../../assets/user.avif";
import { ImMenu } from "react-icons/im";

const Navbar = () => {
  const { setState, state } = useGlobalContext();
  const active = getLocalData("bankId");
  const { userData } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("bankId");
    setState({ ...state, isLoggedIn: false });
  };

  return (
    <NavbarMain $displayCenter={displayCenter}>
      <LogoConta $style={displayCenter}>
        {pathname !== "/landing" && (
          <Menu onClick={() => setState({ ...state, menu: "yes" })}>
            <ImMenu size={20} />
          </Menu>
        )}
        <Link to="/">
          <Logo>BankWay</Logo>
        </Link>
      </LogoConta>

      <RightContainer $displayCenter={displayCenter}>
        <ThemeProvider />

        <PrivateLinks>
          <Circle
            $style={displayAllCenter}
            onClick={() => navigate("/account")}
          >
            <Img src={userData?.image || defaultUser} alt={userData?.name} />
          </Circle>
        </PrivateLinks>

        {!active && !state.isLoggedIn && (
          <PublicLinks>
            <NavAuth />
          </PublicLinks>
        )}

        <AuthB>
          <PrivateLinks>
            <Button $primary="var(--body-color)" onClick={handleLogout}>
              Logout
            </Button>
          </PrivateLinks>
        </AuthB>
      </RightContainer>
    </NavbarMain>
  );
};

export default Navbar;
