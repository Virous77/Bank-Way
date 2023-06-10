import { NavbarMain, Logo, RightContainer, Circle } from "./navbar.style";
import { displayCenter } from "../Common/variable.style";
import img from "../../assets/react.svg";
import ThemeProvider from "../../Theme/ThemeProvider";

const Navbar = () => {
  return (
    <NavbarMain $displayCenter={displayCenter}>
      <Logo>BankWay</Logo>

      <RightContainer $displayCenter={displayCenter}>
        <ThemeProvider />

        <Circle>
          <img src={img} alt="img" />
        </Circle>
      </RightContainer>
    </NavbarMain>
  );
};

export default Navbar;
