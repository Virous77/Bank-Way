import { createContext, useState, useContext } from "react";

type ActivityType = {
  name: string;
  type: string;
  amount: number;
  note: string;
  date: string;
};

const initialState: ActivityType = {
  name: "",
  type: "",
  amount: 0,
  note: "",
  date: "",
};

type ContextType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activityData: ActivityType;
  setActivityData: React.Dispatch<React.SetStateAction<ActivityType>>;
};

const contextInitialState: ContextType = {
  handleChange: () => {},
  activityData: {} as ActivityType,
  setActivityData: () => {},
};

const ActivityContext = createContext(contextInitialState);

export const ActivityContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activityData, setActivityData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  return (
    <ActivityContext.Provider
      value={{ handleChange, activityData, setActivityData }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);

export default ActivityContext;
