import { useAuthContext } from "../../Store/AuthContext";

const User = () => {
  const { userData } = useAuthContext();

  console.log(userData);

  return <div>User</div>;
};

export default User;
