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
import { ITransaction } from "../Interface/interface";
import { expenseType, incomeType } from "../Utils/activity";
import { useLocation } from "react-router-dom";
import { daysAgo } from "../Utils/data";
import { useAuthContext } from "./AuthContext";
import Loader from "../Components/Shimmers/Loader";

export type TActivity = {
  name: string;
  type: string;
  amount: number;
  note: string;
  date: string;
  other: string;
};

type TEditActivity = {
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

const initialState: TActivity = {
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

type TResult = {
  getAllActivity: {
    data: ITransaction[];
    message: string;
    status: number;
  };
};

type TContext = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activityData: TActivity;
  setActivityData: React.Dispatch<React.SetStateAction<TActivity>>;
  handleCreateData: (type: string) => void;
  isLoading: boolean;
  data: TResult | undefined;
  loading: boolean;
  editData: TEditActivity | undefined;
  setEditData: React.Dispatch<React.SetStateAction<TEditActivity | undefined>>;
  updateLoading: boolean;
  handleUpdateData: () => void;
  refetch: () => void;
};

const contextInitialState: TContext = {
  handleChange: () => {},
  activityData: {} as TActivity,
  setActivityData: () => {},
  handleCreateData: () => {},
  isLoading: false,
  data: {} as TResult,
  loading: false,
  editData: {} as TEditActivity,
  setEditData: () => {},
  updateLoading: false,
  handleUpdateData: () => {},
  refetch: () => {},
};

const ActivityContext = createContext(contextInitialState);

export const ActivityContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activityData, setActivityData] = useState(initialState);
  const [editData, setEditData] = useState<TEditActivity | undefined>(
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

  const { refetch, data, loading } = useQuery<TResult>(GET_ALL_ACTIVITY, {
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
      setState((prev) => ({ ...prev, fetch: "mutate" }));
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
      setState((prev) => ({ ...prev, fetch: "mutate" }));
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
        refetch,
      }}
    >
      {loading ? <Loader /> : children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);

export default ActivityContext;
