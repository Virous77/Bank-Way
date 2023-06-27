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
import {
  contextState,
  initialState,
} from "../contextSuggestionType/contextType";

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
  const [editUserData, setEditUserData] = useState<User | undefined>(undefined);

  // * All the DB related services are below
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
      setEditUserData(undefined);
      refetch();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // * All the Action related Auth are below
  const handleError = (error: string) => {
    handleSetNotification({
      message: error || "Something went wrong,Try agin",
      status: "error",
    });
  };
  const handleCreateUser = () => {
    try {
      handleAction({
        action: createUser,
        formData: formData,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const handleUpdateUser = () => {
    const id = getLocalData("bankId");
    const data = {
      id,
      ...formData,
    };

    try {
      handleAction({
        action: updateUser,
        formData: data,
      });
    } catch (error: any) {
      handleError(error.message);
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
      handleError(error.message);
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
        updateLoading,
        editUserData,
        setEditUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
