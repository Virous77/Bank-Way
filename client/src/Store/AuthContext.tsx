import React, { createContext, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/user";
import { useGlobalContext } from "./globalContext";
import { useNavigate } from "react-router-dom";

type formDataType = {
  name: string;
  email: string;
  password: string;
  image: string;
};

type contextType = {
  formData: formDataType;
  setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateUser: () => void;
  loading: boolean;
};

const initialState = {
  name: "",
  email: "",
  password: "",
  image: "",
};

const contextState: contextType = {
  formData: initialState,
  setFormData: () => {},
  handleChange: () => {},
  handleCreateUser: () => {},
  loading: false,
};

export const AuthContext = createContext(contextState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState(initialState);
  const { handleSetNotification, setState } = useGlobalContext();
  const navigate = useNavigate();

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onError: (message) => {
      console.log(message);
      //   handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      localStorage.setItem("bankId", JSON.stringify(data.createUser.data.id));
      setState((prev) => ({ ...prev, show: "", isLoggedIn: true }));
      setFormData(initialState);
      navigate("/");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      createUser({
        variables: {
          input: {
            ...formData,
          },
        },
      });
    } catch (error: any) {
      handleSetNotification({
        message: error.message || "Something went wrong,Try agin",
        status: "error",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ handleChange, formData, setFormData, handleCreateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
