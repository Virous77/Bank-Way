import { useAuthContext } from "../../Store/AuthContext";
import AuthForm from "./AuthForm";

const SignUp = () => {
  const { loading, handleCreateUser } = useAuthContext();

  return (
    <AuthForm
      title="signUp"
      loading={loading}
      handleAction={handleCreateUser}
    />
  );
};

export default SignUp;
