import { MNav } from "./nav.style";
import { useGlobalContext } from "../../Store/globalContext";
import { AiOutlineClose } from "react-icons/ai";
import { displayCenter } from "../Common/variable.style";
import useWorker from "../../hooks/useWorker";
import { Modal } from "../Modal/Modal";
import Safari from "./Safari";
import { useState } from "react";
import Chrome from "./Chrome";
import Wrong from "./Wrong";

const Nav = () => {
  const { state, setState } = useGlobalContext();
  const { handleInstall, userClient, isMobile } = useWorker();
  const [safari, setSafari] = useState("");

  const handleCheckBrowser = () => {
    const data = userClient();

    if (data === "chrome" && isMobile()) {
      return setSafari("chrome");
    }

    if (data === "chrome") {
      return handleInstall();
    }

    if (data === "safari" && isMobile()) {
      setSafari("safari");
    } else {
      setSafari("wrong");
    }
  };

  return (
    <MNav $style={displayCenter}>
      <p>
        {" "}
        {isMobile()
          ? "Install Expensify in your mobile"
          : "Now You can Install Expensify in your Laptop,Mobile or iPad"}
      </p>

      <button onClick={handleCheckBrowser}>Install</button>
      <b onClick={() => setState({ ...state, show: "" })}>
        <AiOutlineClose />
      </b>

      {safari === "safari" && (
        <Modal size="400px" onClose={() => setSafari("")} isOpen="isOpen">
          <Safari />
        </Modal>
      )}

      {safari === "chrome" && (
        <Modal size="400px" onClose={() => setSafari("")} isOpen="isOpen">
          <Chrome />
        </Modal>
      )}

      {safari === "wrong" && (
        <Modal size="400px" onClose={() => setSafari("")} isOpen="isOpen">
          <Wrong />
        </Modal>
      )}
    </MNav>
  );
};

export default Nav;
