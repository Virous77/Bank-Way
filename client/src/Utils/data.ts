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
