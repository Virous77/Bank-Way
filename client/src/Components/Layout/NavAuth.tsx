import { Button } from "./navbar.style";
import { useGlobalContext } from "../../Store/globalContext";

const NavAuth = () => {
  const { setState, state } = useGlobalContext();

  return (
    <Button
      $primary="var(--body-color)"
      onClick={() => setState({ ...state, show: "signIn" })}
    >
      Sign In
    </Button>
  );
};

export default NavAuth;
