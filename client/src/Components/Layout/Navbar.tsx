import {
  NavbarMain,
  Logo,
  RightContainer,
  Circle,
  Img,
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
import { useNavigate, Link } from "react-router-dom";
import defaultUser from "../../assets/user.avif";

const Navbar = () => {
  const { state } = useGlobalContext();
  const active = getLocalData("bankId");
  const { userData, logoutUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <NavbarMain $displayCenter={displayCenter}>
      <LogoConta $style={displayCenter}>
        <Link to="/">
          <Logo>Expensify</Logo>
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
            <Button $primary="var(--body-color)" onClick={logoutUser}>
              Logout
            </Button>
          </PrivateLinks>
        </AuthB>
      </RightContainer>
    </NavbarMain>
  );
};

export default Navbar;
