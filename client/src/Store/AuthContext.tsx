/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_USER,
  UPDATE_USER,
  LOGIN_USER,
  GET_USER,
} from "../graphql/user";
import { useGlobalContext } from "./globalContext";
import { useNavigate } from "react-router-dom";
import { getLocalData, handleAction } from "../Utils/data";
import { User } from "../Interface/interface";

type formDataType = {
  name: string;
  email: string;
  password: string;
  image: string;
  bio: string;
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
  userData: User | undefined;
};

const initialState = {
  name: "",
  email: "",
  password: "",
  image: "",
  bio: "",
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
  userData: {} as User,
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
  const id = getLocalData("bankId");
  const [userData, setData] = useState<User | undefined>(undefined);

  const { refetch } = useQuery(GET_USER, {
    variables: { id },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    fetchPolicy: "standby",
    onCompleted: (data) => {
      setData(data.getUser.data);
    },
  });

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: () => {
      setState((prev) => ({ ...prev, show: "" }));
      setFormData(initialState);
    },
  });

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      localStorage.setItem("bankId", JSON.stringify(data.loginUser.data.id));
      refetch();
      setState((prev) => ({ ...prev, show: "", isLoggedIn: true }));
      navigate("/");
      window.location.reload();
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

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, []);

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
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
