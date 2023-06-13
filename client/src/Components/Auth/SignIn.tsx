import { Main, Form, Input, Heading } from "./auth.style";
import { displayCol } from "../Common/variable.style";
import { Button } from "../Layout/navbar.style";
import { useAuthContext } from "../../Store/AuthContext";

const SignIn = () => {
  const { handleChange, formData, handleCreateUser } = useAuthContext();
  return (
    <Main>
      <Heading>BankWay</Heading>
      <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
        <Input
          type="text"
          placeholder="Name*"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
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
          onClick={handleCreateUser}
        >
          Sign Up
        </Button>
      </Form>
    </Main>
  );
};

export default SignIn;
