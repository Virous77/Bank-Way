import { Main } from "./landing.style";
import SignIn from "../Auth/SignIn";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import { useGlobalContext } from "../../Store/globalContext";

const Landing = () => {
  const { setState, state } = useGlobalContext();
  return (
    <Main>
      {state.show === "signIn" && (
        <Modal isOpen="isOpen" onClose={() => setState({ ...state, show: "" })}>
          <ModalHeader
            name="Sign Up"
            onClose={() => setState({ ...state, show: "" })}
          />
          <SignIn />
        </Modal>
      )}
    </Main>
  );
};

export default Landing;
