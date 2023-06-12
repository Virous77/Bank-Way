import { Main, Form, Input, Heading } from "./auth.style";
import { displayCol } from "../Common/variable.style";
import { Button } from "../Layout/navbar.style";

const SignIn = () => {
  return (
    <Main>
      <Heading>BankWay</Heading>
      <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
        <Input type="text" placeholder="Name*" />
        <Input type="text" placeholder="Email*" />
        <Input type="text" placeholder="Password*" />
        <Button $width="100%" $primary="var(--body-color)">
          Sign Up
        </Button>
      </Form>
    </Main>
  );
};

export default SignIn;
