import { Main, Wrap } from "./settings.style";
import TabList from "./TabList";
import { Tabs } from "../../Utils/data";
import ModalHeader from "../Modal/ModalHeader";
import { Modal } from "../Modal/Modal";
import PasswordModal from "./PasswordModal";
import { useState } from "react";

const Settings = () => {
  const [active, setActive] = useState<string | undefined>(undefined);

  return (
    <Main>
      <h2>Settings</h2>
      <Wrap>
        {Tabs.map((tab) => (
          <TabList key={tab.id} data={tab} setActive={setActive} />
        ))}
      </Wrap>

      {active === "password" && (
        <Modal isOpen="isOpen" onClose={() => setActive(undefined)}>
          <ModalHeader
            name="Password Change"
            onClose={() => setActive(undefined)}
          />
          <PasswordModal />
        </Modal>
      )}
    </Main>
  );
};

export default Settings;
