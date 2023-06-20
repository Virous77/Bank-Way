import React from "react";
import { Main, Form, Input, Heading } from "./auth.style";
import { displayCol } from "../Common/variable.style";
import { Button } from "../Layout/navbar.style";
import { useAuthContext } from "../../Store/AuthContext";

type AuthFormType = {
  title: string;
  loading: boolean;
  handleAction: () => void;
};

const AuthForm: React.FC<AuthFormType> = ({ title, loading, handleAction }) => {
  const { handleChange, formData } = useAuthContext();
  return (
    <Main>
      <Heading>{title === "signUp" ? "Sign Up" : "Sign In"}</Heading>
      <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
        {title === "signUp" && (
          <Input
            type="text"
            placeholder="Name*"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <Input
          type="text"
          placeholder="Email*"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Password*"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          $width="100%"
          $primary="var(--body-color)"
          onClick={handleAction}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : title === "signUp"
            ? "Register"
            : "Login"}
        </Button>
      </Form>
    </Main>
  );
};

export default AuthForm;
