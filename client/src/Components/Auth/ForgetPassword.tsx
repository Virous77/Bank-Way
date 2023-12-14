import { useState } from "react";
import { Main, Form, Input, Heading } from "./auth.style";
import { Button } from "../Layout/navbar.style";
import { displayCol } from "../Common/variable.style";
import { FORGET_PASSWORD, RESET_PASSWORD } from "../../graphql/user";
import { useMutation } from "@apollo/client";
import { handleAction } from "../../Utils/data";
import { useGlobalContext } from "../../Store/globalContext";

type TOTPResponse = {
  forgetPassword: {
    message: string;
    status: boolean;
  };
};

type TResetResponse = {
  resetPassword: {
    message: string;
    status: boolean;
  };
};

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { handleError, handleSetNotification, setState, state } =
    useGlobalContext();
  const [reset, setReset] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [forgetPassword, { loading, data }] = useMutation<TOTPResponse>(
    FORGET_PASSWORD,
    {
      onError: (data) => {
        handleSetNotification({ message: data.message, status: "error" });
      },
    }
  );

  const [resetPassword, { loading: isLoading, data: resetData }] =
    useMutation<TResetResponse>(RESET_PASSWORD, {
      onError: (data) => {
        handleSetNotification({ message: data.message, status: "error" });
      },
      onCompleted: (data) => {
        localStorage.clear();
        handleSetNotification({
          message: data.resetPassword.message,
          status: "success",
        });
        setState({ ...state, show: "signIn" });
      },
    });

  const handleEvent = () => {
    const data = {
      email,
    };
    try {
      handleAction({
        action: forgetPassword,
        formData: data,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  function formHasUnsavedChanges() {
    return data?.forgetPassword.status && !resetData ? true : false;
  }

  window.addEventListener("beforeunload", function (event) {
    if (formHasUnsavedChanges()) {
      event.preventDefault();
      event.returnValue = "";
      return "You have unsaved changes. Are you sure you want to leave?";
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReset({ ...reset, [name]: value });
  };

  const handleReset = () => {
    const { otp, ...rest } = reset;
    const data = {
      ...rest,
      otp: +otp,
    };
    try {
      handleAction({
        action: resetPassword,
        formData: data,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <Main>
      <Heading>
        {data?.forgetPassword.status ? "Setup new Password" : "Forget Password"}
      </Heading>

      {!data?.forgetPassword.status ? (
        <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
          <Input
            type="text"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            $width="100%"
            $primary="var(--body-color)"
            disabled={loading}
            style={{ marginTop: "-0.5rem" }}
            onClick={handleEvent}
          >
            {loading ? "Processing..." : "Get OTP"}
          </Button>
        </Form>
      ) : (
        <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
          <fieldset>
            <label htmlFor="password"> New Password</label>
            <Input
              type="text"
              placeholder="New Password*"
              value={reset.password}
              name="password"
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="confirmPassword"> Confirm Password</label>
            <Input
              type="text"
              placeholder="Confirm Password*"
              value={reset.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="otp">OTP</label>
            <Input
              type="text"
              placeholder="OTP*"
              value={reset.otp}
              name="otp"
              onChange={handleChange}
            />
          </fieldset>

          <Button
            $width="100%"
            $primary="var(--body-color)"
            disabled={isLoading}
            style={{ marginTop: "-0.5rem" }}
            onClick={handleReset}
          >
            {isLoading ? "Processing..." : "Change Password"}
          </Button>
        </Form>
      )}
    </Main>
  );
};

export default ForgetPassword;
