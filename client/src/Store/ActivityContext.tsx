/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client";
import { createContext, useState, useContext } from "react";
import {
  CREATE_ACTIVITY,
  GET_ALL_ACTIVITY,
  UPDATE_ACTIVITY,
} from "../graphql/activity";
import { useGlobalContext } from "./globalContext";
import {
  getLocalData,
  handleAction,
  handleGlobalError,
  validateTokenMessage,
} from "../Utils/data";
import { Transaction } from "../Interface/interface";
import { expenseType, incomeType } from "../Utils/activity";
import { useLocation } from "react-router-dom";
import { daysAgo } from "../Utils/data";
import { useAuthContext } from "./AuthContext";

export type ActivityType = {
  name: string;
  type: string;
  amount: number;
  note: string;
  date: string;
  other: string;
};

type EditActivityType = {
  id: string;
  name: string;
  type: string;
  amount: number;
  note: string;
  date: string;
  other: string;
  type_name: string;
};

const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();

const initialState: ActivityType = {
  name: "",
  type: "",
  amount: 0,
  note: "",
  date: `${date.getFullYear()}-${month <= 9 ? `0${month}` : month}-${
    day <= 9 ? `0${day}` : day
  }`,
  other: "",
};

const EditInitialState = {
  id: "",
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

  const {
    handleSetNotification,
    setState,
    state,
    handleError,
    data: settingData,
  } = useGlobalContext();
  const id = getLocalData("bankId");
  const token = getLocalData("bankToken");
  const { pathname } = useLocation();
  const DaysAgo = daysAgo(Number(state.days));
  const { logoutUser } = useAuthContext();

  const input = {
    id,
    token,
    date: DaysAgo,
    type:
      pathname === "/transaction" ? "all" : settingData?.home_transaction_type,
  };

  const { refetch, data, loading } = useQuery<Result>(GET_ALL_ACTIVITY, {
    variables: { input },
    onError: (error) => {
      const validateError = validateTokenMessage(error.message);
      if (validateError) {
        logoutUser();
      }
      handleGlobalError({
        error: error.message,
        handleSetNotification: handleSetNotification,
        setState: setState,
      });
    },
    fetchPolicy: id && state.days ? "cache-first" : "standby",
  });

  const [createActivity, { loading: isLoading }] = useMutation(
    CREATE_ACTIVITY,
    {
      onError: (error) => {
        const validateError = validateTokenMessage(error.message);
        if (validateError) {
          logoutUser();
        }
        handleSetNotification({ message: error.message, status: "error" });
      },
      onCompleted: () => {
        setState({ ...state, show: "" });
        setActivityData(initialState);
        refetch();
      },
    }
  );

  const [updateActivity, { loading: updateLoading }] = useMutation(
    UPDATE_ACTIVITY,
    {
      onError: (error) => {
        const validateError = validateTokenMessage(error.message);
        if (validateError) {
          logoutUser();
        }
        handleSetNotification({ message: error.message, status: "error" });
      },
      onCompleted: (data) => {
        handleSetNotification({
          message: data.updateActivity.message,
          status: "success",
        });
        setEditData(EditInitialState);
        refetch();
      },
      context: {
        clientName: "endpoint2",
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData?.amount) {
      const { name, value } = e.target;
      setEditData({ ...editData, [name]: value });
    } else {
      const { name, value } = e.target;
      setActivityData({ ...activityData, [name]: value });
    }
  };

  const handleCreateData = (typeName: string) => {
    const { type, other, amount, ...rest } = activityData;
    const incomeExpenseType = other ? other : type;
    const data = {
      type: typeName === "Refund" ? "refund" : incomeExpenseType,
      ...rest,
      type_name: typeName.toLowerCase(),
      amount: Number(amount),
      user_id: id,
      token,
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

  const handleUpdateData = () => {
    if (!editData) return;
    const { type, other, amount, type_name, id: tId, ...rest } = editData;
    const transType = type_name === "expense" ? expenseType : incomeType;
    const isOther =
      type !== "others" && transType.find((id) => id.name === type);

    const data = {
      type: isOther ? isOther.name : other,
      ...rest,
      amount: Number(amount),
      user_id: id,
      type_name,
      _id: tId,
      token,
    };

    try {
      handleAction({
        action: updateActivity,
        formData: data,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

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
