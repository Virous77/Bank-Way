/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Section, FieldSet } from "./settings.style";
import { useGlobalContext } from "../../Store/globalContext";
import { useMutation } from "@apollo/client";
import { PASSWORD_CHANGE } from "../../graphql/user";
import { handleAction } from "../../Utils/data";
import { Form } from "../User/user.style";
import { displayCol } from "../Common/variable.style";
import { Input } from "../Auth/auth.style";
import { Button } from "../Layout/navbar.style";
import { getLocalData } from "../../Utils/data";

type TPasswordModal = {
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const PasswordModal: React.FC<TPasswordModal> = ({ setActive }) => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
  });
  const { handleSetNotification } = useGlobalContext();
  const id = getLocalData("bankId");

  const [passwordChange, { loading }] = useMutation(PASSWORD_CHANGE, {
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      handleSetNotification({
        message: data.changePassword.message,
        status: "success",
      });
      setActive(undefined);
    },
  });

  const handlePassword = () => {
    const data = {
      id,
      ...passwordData,
    };

    try {
      handleAction({
        action: passwordChange,
        formData: data,
      });
    } catch (error: any) {
      handleSetNotification({
        message: error || "Something went wrong,Try agin",
        status: "error",
      });
    }
  };

  return (
    <Section>
      <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
        <FieldSet>
          <label>Current Password</label>
          <Input
            type="text"
            value={passwordData.password}
            onChange={(e) =>
              setPasswordData({ ...passwordData, password: e.target.value })
            }
          />
        </FieldSet>

        <FieldSet>
          <label>New Password</label>
          <Input
            type="text"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
          />
        </FieldSet>

        <Button
          $width="100%"
          $primary="var(--main-font-color)"
          $color="var(--body-color)"
          onClick={handlePassword}
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>
      </Form>
    </Section>
  );
};

export default PasswordModal;
