/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER, LOGIN_USER } from "../graphql/user";
import { useGlobalContext } from "./globalContext";
import { useNavigate } from "react-router-dom";
import { handleAction } from "../Utils/data";
import { User } from "../Interface/interface";

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
  handleUpdateUser: () => void;
  handleLoginUser: () => void;
  loginLoading: boolean;
  data: User;
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
  handleUpdateUser: () => {},
  handleLoginUser: () => {},
  loginLoading: false,
  data: {} as User,
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
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: () => {
      setState((prev) => ({ ...prev, show: "" }));
      setFormData(initialState);
    },
  });

  const [loginUser, { loading: loginLoading, data }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      localStorage.setItem("bankId", JSON.stringify(data.loginUser.data.id));
      setState((prev) => ({ ...prev, show: "", isLoggedIn: true }));
      navigate("/dashboard");
      setFormData(initialState);
    },
  });

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      handleSetNotification({
        message: data.updateUser.message,
        status: "success",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = () => {
    try {
      handleAction({
        action: createUser,
        formData: formData,
      });
    } catch (error: any) {
      handleSetNotification({
        message: error.message || "Something went wrong,Try agin",
        status: "error",
      });
    }
  };

  const handleUpdateUser = () => {
    const data = {
      id: "64911d53ff7f90efac091610",
      name: "Monu Kumar",
    };

    try {
      handleAction({
        action: updateUser,
        formData: data,
      });
    } catch (error: any) {
      handleSetNotification({
        message: error.message || "Something went wrong,Try agin",
        status: "error",
      });
    }
  };

  const handleLoginUser = () => {
    const data = {
      password: formData.password,
      email: formData.email,
    };

    try {
      handleAction({
        action: loginUser,
        formData: data,
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
      value={{
        handleChange,
        formData,
        setFormData,
        handleCreateUser,
        loading,
        handleUpdateUser,
        handleLoginUser,
        loginLoading,
        data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
