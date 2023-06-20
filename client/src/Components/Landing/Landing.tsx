import { Main } from "./landing.style";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import { useGlobalContext } from "../../Store/globalContext";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";

const Landing = () => {
  const { setState, state } = useGlobalContext();

  const activeTab =
    state.show === "signIn"
      ? "signIn"
      : state.show === "signUp"
      ? "signUp"
      : "cool";

  return (
    <Main>
      {state.show === activeTab && (
        <Modal isOpen="isOpen" onClose={() => setState({ ...state, show: "" })}>
          <ModalHeader
            name="BankWay"
            onClose={() => setState({ ...state, show: "" })}
          />
          {activeTab === "signUp" ? <SignUp /> : <SignIn />}
        </Modal>
      )}
    </Main>
  );
};

export default Landing;
