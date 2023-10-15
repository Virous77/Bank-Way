/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiHomeSmile } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import React from "react";
import { stateType } from "../Store/globalContext";

export const navLink = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: BiHomeSmile,
  },
  {
    id: 2,
    name: "Transaction",
    link: "/transaction",
    icon: TbReportMoney,
  },
  {
    id: 3,
    name: "Account",
    link: "/account",
    icon: MdOutlineAccountCircle,
  },
  {
    id: 4,
    name: "Settings",
    link: "/settings",
    icon: FiSettings,
  },
  {
    id: 5,
    name: "Transfer",
    link: "/transfer",
    icon: BiTransfer,
  },
];

export const getLocalData = (name: string) => {
  const result = localStorage.getItem(name);
  return result ? JSON.parse(result) : undefined;
};

type actionType = {
  action: any;
  formData: any;
};

export const handleAction = ({ action, formData }: actionType) => {
  action({
    variables: {
      input: {
        ...formData,
      },
    },
  });
};

export const Tabs = [
  {
    id: 1,
    name: "Home Settings",
    value: "homeConfig",
    message: "Configure your home setting as you like.",
  },
  {
    id: 2,
    name: "Password Change",
    value: "password",
    message: "Change your password easily and keep your account safe.",
  },
  {
    id: 3,
    name: "Theme Settings",
    value: "theme",
    message: "Set Theme according to your system setting or auto.",
  },
  {
    id: 4,
    name: "Download Transaction",
    value: "trans",
    message: "Download Transaction data.",
  },
];

export const currentMoment = (date: Date) => {
  const hours = date.getHours();

  let currentMoments;

  if (hours >= 5 && hours <= 11) {
    currentMoments = "Good Morning";
  } else if (hours >= 12 && hours <= 17) {
    currentMoments = "Good Afternoon";
  } else {
    currentMoments = "Good Evening";
  }

  return currentMoments;
};

export const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date: Date) => {
  const currentMonth = date?.getMonth();
  const currentDat = date?.getDate();

  const newDate =
    month[currentMonth] + " " + currentDat + ", " + date?.getFullYear();

  return newDate;
};

export const dateFormat = (date: any) => {
  const splitDate = date?.split("-");

  const modifiedDate =
    splitDate &&
    month[splitDate[1] - 1] + " " + splitDate[0] + ", " + splitDate[2];

  return modifiedDate;
};

export const dateFormat2 = (date: any) => {
  const splitDate = date?.split("-");

  const modifiedDate =
    splitDate && month[splitDate[1] - 1] + ", " + splitDate[2];

  return modifiedDate;
};

export const daysAgo = (days: number) => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - days
  );
};

export const filterAllTransactionData = [
  {
    id: 1,
    name: "Select Type",
    value: "all",
  },
  {
    id: 2,
    name: "Income",
    value: "income",
  },
  {
    id: 3,
    name: "Expense",
    value: "expense",
  },
  {
    id: 4,
    name: "Refund",
    value: "refund",
  },
];

export const filterTransactionData = [
  {
    id: 1,
    name: "Last 7 days",
    value: "7",
  },
  {
    id: 2,
    name: "Last 15 days",
    value: "15",
  },
  {
    id: 3,
    name: "Last 30 days",
    value: "30",
  },
  {
    id: 5,
    name: "3 Month",
    value: "3",
  },
  {
    id: 6,
    name: "All Time",
    value: "all",
  },
];

type TransType = {
  [key: string]: string;
};

export const transactionTimeFrame: TransType = {
  "30": "Last 30 Days Transaction",
  all: "All Time Transaction",
  "3": "Last 3 Month Transaction",
  "15": "Last 15 Days Transaction",
  "7": "Last 7 Days Transaction",
};

export const validateTokenMessage = (error: string) => {
  if (
    error === "session is over, login again" ||
    error === "token is incorrect or session is over" ||
    error === "token is incorrect"
  ) {
    return true;
  } else {
    return false;
  }
};

type GlobalParams = {
  error: string;
  handleSetNotification: ({
    message,
    status,
  }: {
    message: string;
    status: string;
  }) => void;
  setState: React.Dispatch<React.SetStateAction<stateType>>;
};

export const handleGlobalError = ({
  error,
  handleSetNotification,
  setState,
}: GlobalParams) => {
  if (error === "Failed to fetch") {
    setState((prev) => ({ ...prev, networkConnection: true }));
  } else {
    handleSetNotification({ message: error, status: "error" });
  }
};
