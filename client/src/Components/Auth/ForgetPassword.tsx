import React, { useState } from "react";
import { Main, Form, Input, Heading } from "./auth.style";
import { Button } from "../Layout/navbar.style";
import { displayCol } from "../Common/variable.style";
import { FORGET_PASSWORD } from "../../graphql/user";
import { useMutation } from "@apollo/client";
import { handleAction } from "../../Utils/data";
import { useGlobalContext } from "../../Store/globalContext";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { handleError } = useGlobalContext();

  const [forgetPassword, { loading }] = useMutation(FORGET_PASSWORD, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
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

  return (
    <Main>
      <Heading>Forget Password</Heading>

      <React.Fragment>
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
      </React.Fragment>
    </Main>
  );
};

export default ForgetPassword;
