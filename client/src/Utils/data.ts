/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiHomeSmile } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";

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
