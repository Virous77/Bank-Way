import { NavbarMain, Logo, RightContainer, Circle } from "./navbar.style";
import { displayCenter } from "../Common/variable.style";
import img from "../../assets/react.svg";
import ThemeProvider from "../../Theme/ThemeProvider";
import { PrivateLinks, PublicLinks } from "../Private/PtotectedRoutes";
import NavAuth from "./NavAuth";

const Navbar = () => {
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

        <PublicLinks>
          <NavAuth />
        </PublicLinks>
      </RightContainer>
    </NavbarMain>
  );
};

export default Navbar;
