import { displayFlex } from "../Common/variable.style";
import { Main } from "../Settings/settings.style";
import { PayHeader } from "./money.style";
import { useGlobalContext } from "../../Store/globalContext";
import AddPayment from "./AddPayment";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import PaymentTransaction from "./PaymentTransaction";

const MoneyPaid = () => {
  const { setState, state } = useGlobalContext();

  return (
    <Main>
      <PayHeader $style={displayFlex}>
        <h2>Transfer</h2>
        <button onClick={() => setState({ ...state, show: "payment" })}>
          Add Payment
        </button>
      </PayHeader>
      <PaymentTransaction />

      {state.show === "payment" && (
        <Modal
          isOpen="isOpen"
          onClose={() => setState({ ...state, show: "" })}
          size="500px"
        >
          <ModalHeader
            name="Add Payment"
            onClose={() => setState({ ...state, show: "" })}
          />
          <AddPayment />
        </Modal>
      )}
    </Main>
  );
};

export default MoneyPaid;
