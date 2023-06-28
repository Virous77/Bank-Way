import { NavbarMain, Logo, RightContainer, Circle, Img } from "./navbar.style";
import { displayAllCenter, displayCenter } from "../Common/variable.style";
import ThemeProvider from "../../Theme/ThemeProvider";
import { PrivateLinks, PublicLinks } from "../Private/PtotectedRoutes";
import NavAuth from "./NavAuth";
import { Button } from "./navbar.style";
import { getLocalData } from "../../Utils/data";
import { useGlobalContext } from "../../Store/globalContext";
import { useAuthContext } from "../../Store/AuthContext";
import { CircleShimmer } from "../Shimmers/TextShimmer";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setState, state } = useGlobalContext();
  const active = getLocalData("bankId");
  const { userData } = useAuthContext();
  const navigate = useNavigate();

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
          <Circle
            $style={displayAllCenter}
            onClick={() => navigate("/account")}
          >
            {userData?.image ? (
              <Img src={userData?.image} alt="img" />
            ) : (
              <CircleShimmer size={85} />
            )}
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
