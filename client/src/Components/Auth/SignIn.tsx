import AuthForm from "./AuthForm";
import { Main } from "./auth.style";
import { useAuthContext } from "../../Store/AuthContext";

const SignIn = () => {
  const { loginLoading, handleLoginUser } = useAuthContext();

  return (
    <Main>
      <AuthForm
        title="signIn"
        loading={loginLoading}
        handleAction={handleLoginUser}
      />
    </Main>
  );
};

export default SignIn;
