import { MNav } from "./nav.style";
import { useGlobalContext } from "../../Store/globalContext";
import { AiOutlineClose } from "react-icons/ai";
import { displayCenter } from "../Common/variable.style";
import useWorker from "../../hooks/useWorker";
import { Modal } from "../Modal/Modal";
import Safari from "./Safari";
import { useState } from "react";
import Wrong from "./Wrong";
import useAppInstallApi from "../../hooks/useAppInstallApi";

const Nav = () => {
  const { state, setState } = useGlobalContext();
  const { handleInstall, userClient, isMobile } = useWorker();
  const [safari, setSafari] = useState("");
  const { setPwaStatusData } = useAppInstallApi();

  const handleCheckBrowser = () => {
    const data = userClient();
    if (data === "safari" && isMobile()) return setSafari("safari");
    if (data === "safari" || data === "firefox") return setSafari("wrong");
    handleInstall();
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
      <b
        onClick={() => {
          setState({ ...state, install: "" });
          setPwaStatusData();
        }}
      >
        <AiOutlineClose />
      </b>

      {safari === "safari" && (
        <Modal size="400px" onClose={() => setSafari("")} isOpen="isOpen">
          <Safari />
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
