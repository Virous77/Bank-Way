/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiHomeSmile } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

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
    name: "Settings",
    link: "/settings",
    icon: FiSettings,
  },
];

export const getLocalData = (name: string) => {
  const result = localStorage.getItem(name);
  return result ? JSON.parse(result) : undefined;
};

type errorType = {
  message: string;
  status: string;
};

type actionType = {
  action: any;
  formData: any;
  handleError: ({ message, status }: errorType) => void;
};

export const handleAction = ({ action, formData, handleError }: actionType) => {
  try {
    action({
      variables: {
        input: {
          ...formData,
        },
      },
    });
  } catch (error: any) {
    console.log(error);
    handleError({
      message: error.message || "Something went wrong,Try agin",
      status: "error",
    });
  }
};
