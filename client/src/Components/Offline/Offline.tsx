import { Modal } from "../Modal/Modal";
import { useGlobalContext } from "../../Store/globalContext";
import networkDown from "../../assets/network-down.svg";
import { Main } from "./offline.style";
import { displayCol } from "../Common/variable.style";

const Offline = () => {
  const { setState, state } = useGlobalContext();

  return (
    <>
      {state.networkConnection && (
        <Modal
          isOpen="isOpen"
          onClose={() => setState({ ...state, networkConnection: false })}
          size="350px"
        >
          <Main $style={displayCol}>
            <h1>Oops, Something Went Wrong!!</h1>

            <div>
              <img src={networkDown} alt="network-down" />
              <p>
                Please check your Internet connection. it's looks your internet
                is down.
              </p>
            </div>
          </Main>
        </Modal>
      )}
    </>
  );
};

export default Offline;
