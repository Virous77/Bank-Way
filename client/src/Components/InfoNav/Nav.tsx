import { MNav } from "./nav.style";
import { useGlobalContext } from "../../Store/globalContext";
import { AiOutlineClose } from "react-icons/ai";
import { displayCenter } from "../Common/variable.style";
import useWorker from "../../hooks/useWorker";
import { Modal } from "../Modal/Modal";
import Safari from "./Safari";
import { useState } from "react";

const Nav = () => {
  const { state, setState } = useGlobalContext();
  const { handleInstall, userClient } = useWorker();
  const [safari, setSafari] = useState("");

  const isMobile = () => {
    if (
      screen.width <= 640 ||
      (window.matchMedia &&
        window.matchMedia("only screen and (max-width: 640px)").matches)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckBrowser = () => {
    const data = userClient();

    if (data === "chrome") {
      return handleInstall();
    }

    if (data === "safari" && isMobile()) {
      setSafari("mobile");
    } else {
      setSafari("desktop");
    }
  };

  return (
    <MNav $style={displayCenter}>
      <p>Now You can Install Expensify in your Laptop,Mobile or iPad</p>

      <button onClick={handleCheckBrowser}>Install</button>
      <b onClick={() => setState({ ...state, show: "" })}>
        <AiOutlineClose />
      </b>

      {safari && (
        <Modal size="400px" onClose={() => setSafari("")} isOpen="isOpen">
          <Safari />
        </Modal>
      )}
    </MNav>
  );
};

export default Nav;
