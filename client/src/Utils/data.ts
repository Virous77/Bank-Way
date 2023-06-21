/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiHomeSmile } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";

export const navLink = [
  {
    id: 1,
    name: "Home",
    link: "/dashboard",
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
