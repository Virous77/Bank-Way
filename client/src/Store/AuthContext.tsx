/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
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
import axios from "axios";

type UserResponse = {
  getUser: {
    data: User;
  };
};

export const AuthContext = createContext(contextState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState(initialState);
  const { handleSetNotification, setState, handleError } = useGlobalContext();
  const navigate = useNavigate();
  const id = getLocalData("bankId");
  const [editUserData, setEditUserData] = useState<User | undefined>(undefined);

  // * All the DB related services are below
  const { data, refetch } = useQuery<UserResponse | undefined>(GET_USER, {
    variables: { id },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    fetchPolicy: id ? "cache-and-network" : "standby",
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

  const handleUpdateUser = async () => {
    const id = getLocalData("bankId");
    const { image, ...rest } = formData;
    try {
      if (image) {
        const uploadImage = new FormData();
        uploadImage.append("image", image);

        if (editUserData?.image) {
          const fileName = editUserData?.image?.split("/");

          await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/uploads/${
              fileName && fileName[fileName.length - 1]
            }`
          );
        }

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          uploadImage
        );

        const data = {
          id,
          image: res.data.image,
          ...rest,
        };

        if (res.data.image) {
          handleAction({
            action: updateUser,
            formData: data,
          });
        }
      }

      if (!image) {
        const data = {
          id,
          image: editUserData?.image,
          ...rest,
        };

        handleAction({
          action: updateUser,
          formData: data,
        });
      }
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
        userData: data?.getUser.data,
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
