import { Main } from "./landing.style";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import { useGlobalContext } from "../../Store/globalContext";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";
import money from "../../assets/money.svg";
import { displayCol } from "../Common/variable.style";
import useAppTitle from "../../hooks/useAppTitle";
import ForgetPassword from "../Auth/ForgetPassword";

const Landing = () => {
  useAppTitle({ name: "Expensify" });
  const { setState, state } = useGlobalContext();

  const activeTab =
    state.show === "signIn"
      ? "signIn"
      : state.show === "signUp"
      ? "signUp"
      : state.show === "forget"
      ? "forget"
      : "cool";

  return (
    <Main $style={displayCol}>
      <section>
        <h1>Goodbye, money stress. Hello BankWay.</h1>
        <img src={money} alt="BankWay" />
        <h2>Take the guesswork out of managing your money.</h2>

        <p>
          BankWay makes it easy to spend and track your money. Budget smarter by
          knowing how much you spending daily. You have all the good features
          add notes & inbuilt graph to understand better.
        </p>
        <button onClick={() => setState({ ...state, show: "signUp" })}>
          Sign Up
        </button>
      </section>
      {state.show === activeTab && (
        <Modal
          isOpen="isOpen"
          onClose={() =>
            setState({
              ...state,
              show: state.show === "forget" ? "forget" : "",
            })
          }
        >
          <ModalHeader
            name="BankWay"
            onClose={() => setState({ ...state, show: "" })}
          />
          {activeTab === "signUp" ? (
            <SignUp />
          ) : activeTab === "signIn" ? (
            <SignIn />
          ) : (
            <ForgetPassword />
          )}
        </Modal>
      )}
    </Main>
  );
};

export default Landing;
