import { createContext, useContext, useState, ReactNode } from "react";
import { UPDATE_SETTING, GET_SETTING } from "../graphql/setting";
import { useQuery, useMutation } from "@apollo/client";
import { getLocalData, handleAction } from "../Utils/data";
import { Setting } from "../Interface/interface";

type notificationType = {
  message: string;
  status: string;
};

type stateType = {
  show: string;
  isLoggedIn: boolean;
  active: string;
  fetch: string;
  search: string;
  days: string;
  menu: string;
  csvDataType: string;
  error: boolean;
};

type settingType = {
  [key: string]: boolean | string;
};

type GlobalType = {
  notification: notificationType;
  setNotification?: React.Dispatch<React.SetStateAction<notificationType>>;
  handleSetNotification: ({ message, status }: notificationType) => void;
  state: stateType;
  setState: React.Dispatch<React.SetStateAction<stateType>>;
  data: Setting | undefined;
  loading: boolean;
  handleUpdateSetting: (e: settingType) => void;
  handleError: (e: string) => void;
};

type SettingResponse = {
  getUserSetting: {
    data: Setting;
  };
};

const stateInitialValue = {
  message: "",
  status: "",
};

const stateInitialValueTwo: stateType = {
  show: "",
  isLoggedIn: false,
  active: "",
  fetch: "",
  search: "",
  days: "",
  menu: "",
  csvDataType: "all",
  error: false,
};

const initialValue: GlobalType = {
  notification: stateInitialValue,
  setNotification: () => {},
  handleSetNotification: () => {},
  state: stateInitialValueTwo,
  setState: () => {},
  data: {} as Setting,
  loading: false,
  handleUpdateSetting: () => {},
  handleError: () => {},
};

const GlobalContext = createContext<GlobalType>(initialValue);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notification, setNotification] =
    useState<notificationType>(stateInitialValue);
  const [state, setState] = useState(stateInitialValueTwo);
  const id = getLocalData("bankId");

  ///App notification
  const handleSetNotification = ({ message, status }: notificationType) => {
    setNotification({ ...notification, message, status });

    if (message) {
      document.querySelector(".notification")?.classList.add("active");
    }

    setTimeout(() => {
      document.querySelector(".notification")?.classList.remove("active");
      setNotification(stateInitialValue);
    }, 5000);
  };

  const { data, refetch } = useQuery<SettingResponse | undefined>(GET_SETTING, {
    variables: { id },
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      setState({
        ...state,
        days: data?.getUserSetting.data.home_transaction_duration || "7",
      });
    },
    fetchPolicy: id ? "cache-and-network" : "standby",
  });

  const [updateSetting, { loading }] = useMutation(UPDATE_SETTING, {
    onError: (error) => {
      handleSetNotification({ message: error.message, status: "error" });
    },
    onCompleted: (data) => {
      handleSetNotification({
        message: data.updateSetting.message,
        status: "success",
      });
      refetch();
    },
  });

  const handleError = (error: string) => {
    handleSetNotification({
      message: error || "Something went wrong,Try agin",
      status: "error",
    });
  };

  const handleUpdateSetting = (setting: settingType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modifyData: any = {
      user_id: data?.getUserSetting.data.user_id,
      transaction_icon_type: data?.getUserSetting.data.transaction_icon_type,
      home_transaction_duration:
        data?.getUserSetting.data.home_transaction_duration,
      home_transaction_type: data?.getUserSetting.data.home_transaction_type,
    };

    const keys = Object.keys(setting);
    delete modifyData[keys[0]];

    const newSetting = {
      ...modifyData,
      ...setting,
    };

    try {
      handleAction({
        action: updateSetting,
        formData: newSetting,
      });
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        notification,
        handleSetNotification,
        state,
        setState,
        data: data?.getUserSetting.data,
        loading,
        handleUpdateSetting,
        handleError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContext;
