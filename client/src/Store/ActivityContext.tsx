/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client";
import { createContext, useState, useContext } from "react";
import { CREATE_ACTIVITY, GET_ALL_ACTIVITY } from "../graphql/activity";
import { useGlobalContext } from "./globalContext";
import { getLocalData, handleAction } from "../Utils/data";
import { UPDATE_USER } from "../graphql/user";
import { Transaction } from "../Interface/interface";

type ActivityType = {
  name: string;
  type: string;
  amount: number;
  note: string;
  date: string;
  other: string;
};

type EditActivityType = {
  name: string;
  type: string;
  amount: number;
  note: string;
  date: string;
  other: string;
  type_name: string;
};

const initialState: ActivityType = {
  name: "",
  type: "",
  amount: 0,
  note: "",
  date: "",
  other: "",
};

const EditInitialState = {
  name: "",
  type: "",
  amount: 0,
  note: "",
  date: "",
  other: "",
  type_name: "",
};

type Result = {
  getAllActivity: {
    data: Transaction[];
    message: string;
    status: number;
  };
};

type ContextType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activityData: ActivityType;
  setActivityData: React.Dispatch<React.SetStateAction<ActivityType>>;
  handleCreateData: (type: string) => void;
  isLoading: boolean;
  data: Result | undefined;
  loading: boolean;
  editData: EditActivityType | undefined;
  setEditData: React.Dispatch<
    React.SetStateAction<EditActivityType | undefined>
  >;
  updateLoading: boolean;
  handleUpdateData: () => void;
};

const contextInitialState: ContextType = {
  handleChange: () => {},
  activityData: {} as ActivityType,
  setActivityData: () => {},
  handleCreateData: () => {},
  isLoading: false,
  data: {} as Result,
  loading: false,
  editData: {} as EditActivityType,
  setEditData: () => {},
  updateLoading: false,
  handleUpdateData: () => {},
};

const ActivityContext = createContext(contextInitialState);

export const ActivityContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activityData, setActivityData] = useState(initialState);
  const [editData, setEditData] = useState<EditActivityType | undefined>(
    EditInitialState
  );
  const { handleSetNotification } = useGlobalContext();
  const id = getLocalData("bankId");

  const input = {
    id,
    count: 5,
  };
  const { refetch, data, loading } = useQuery<Result>(GET_ALL_ACTIVITY, {
    variables: { input },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    context: { clientName: "endpoint2" },
  });

  const [createActivity, { loading: isLoading }] = useMutation(
    CREATE_ACTIVITY,
    {
      onError: (error) => {
        handleSetNotification({ message: error.message, status: "error" });
      },
      onCompleted: () => {
        setActivityData(initialState);
        refetch();
      },
      context: {
        clientName: "endpoint2",
      },
    }
  );

  const [updateActivity, { loading: updateLoading }] = useMutation(
    UPDATE_USER,
    {
      onError: (error) => {
        handleSetNotification({ message: error.message, status: "error" });
      },
      onCompleted: (data) => {
        handleSetNotification({
          message: data.updateUser.message,
          status: "success",
        });
        refetch();
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleError = (error: string) => {
    handleSetNotification({
      message: error || "Something went wrong,Try agin",
      status: "error",
    });
  };

  const handleCreateData = (typeName: string) => {
    const { type, other, amount, ...rest } = activityData;
    const data = {
      type: other ? other : type,
      ...rest,
      type_name: typeName.toLowerCase(),
      amount: Number(amount),
      user_id: id,
    };

    try {
      handleAction({
        action: createActivity,
        formData: data,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  const handleUpdateData = () => {};

  return (
    <ActivityContext.Provider
      value={{
        handleChange,
        activityData,
        setActivityData,
        handleCreateData,
        isLoading,
        data,
        loading,
        editData,
        setEditData,
        updateLoading,
        handleUpdateData,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);

export default ActivityContext;
