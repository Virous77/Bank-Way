import { useState } from "react";
import { Main, Wrap } from "./settings.style";
import TabList from "./TabList";
import { Tabs } from "../../Utils/data";
import ModalHeader from "../Modal/ModalHeader";
import { Modal } from "../Modal/Modal";
import PasswordModal from "./PasswordModal";
import ThemeSetting from "./ThemeSetting";
import HomeSetting from "./HomeSetting";

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
        <Modal
          isOpen="isOpen"
          onClose={() => setActive(undefined)}
          size="400px"
        >
          <ModalHeader
            name="Password Setting"
            onClose={() => setActive(undefined)}
          />
          <PasswordModal setActive={setActive} />
        </Modal>
      )}

      {active === "theme" && (
        <Modal
          isOpen="isOpen"
          onClose={() => setActive(undefined)}
          size="450px"
        >
          <ModalHeader
            name="Theme Setting"
            onClose={() => setActive(undefined)}
          />
          <ThemeSetting />
        </Modal>
      )}

      {active === "homeConfig" && (
        <Modal
          isOpen="isOpen"
          onClose={() => setActive(undefined)}
          size="450px"
        >
          <ModalHeader
            name="Home Setting"
            onClose={() => setActive(undefined)}
          />
          <HomeSetting />
        </Modal>
      )}
    </Main>
  );
};

export default Settings;
