import { createContext, useContext, useState } from "react";

type formDataType = {
  name: string;
  email: string;
  password: string;
  image: string;
};

const contextState = {
  formData: {} as formDataType,
  setFormData: () => {},
  handleChange: () => {},
};

export const AuthContext = createContext(contextState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = () => {};

  return (
    <AuthContext.Provider
      value={{ handleChange, formData, setFormData, handleCreateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
