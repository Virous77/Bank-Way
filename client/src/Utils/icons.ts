/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImUserTie } from "react-icons/im";
import {
  MdSportsKabaddi,
  MdCardGiftcard,
  MdFastfood,
  MdCastForEducation,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { TbBusinessplan } from "react-icons/tb";
import { BiMoviePlay } from "react-icons/bi";
import { SiWish } from "react-icons/si";
import {
  GiTakeMyMoney,
  GiMoneyStack,
  GiElectric,
  GiCommercialAirplane,
} from "react-icons/gi";
import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from "react-icons/hi";
import { FaBatteryFull } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import { FcNeutralTrading } from "react-icons/fc";

import investing from "../assets/icon/investing.jpg";
import education from "../assets/icon/education.jpeg";
import transactionIcon from "../assets/icon/transaction.jpg";
import freelancing from "../assets/icon/freelancing.jpeg";
import sports from "../assets/icon/sports.jpeg";
import shopping from "../assets/icon/shopping.jpeg";
import gift from "../assets/icon/gift.jpeg";
import business from "../assets/icon/buissness.jpeg";
import foods from "../assets/icon/foods.jpeg";
import enjoy from "../assets/icon/enjoy.jpeg";
import wishes from "../assets/icon/wishes.jpeg";
import electronic from "../assets/icon/electronic.jpeg";
import travel from "../assets/icon/travel.jpeg";
import rent from "../assets/icon/rent.jpeg";
import recharge from "../assets/icon/recharge.jpeg";
import others from "../assets/icon/others.jpeg";
import trading from "../assets/icon/trading.jpeg";
import refund from "../assets/icon/refund.jpeg";

type TSvgIcon = {
  [key: string]: {
    value: any;
  };
};

export const SvgIcon: TSvgIcon = {
  salary: { value: GiMoneyStack },
  investing: { value: GiTakeMyMoney },
  freelancing: { value: ImUserTie },
  sports: { value: MdSportsKabaddi },
  gift: { value: MdCardGiftcard },
  business: { value: TbBusinessplan },
  foods: { value: MdFastfood },
  entertainments: { value: BiMoviePlay },
  education: { value: MdCastForEducation },
  wishes: { value: SiWish },
  electronics: { value: GiElectric },
  travel: { value: GiCommercialAirplane },
  shopping: { value: HiOutlineShoppingBag },
  rent: { value: MdOutlineBedroomParent },
  recharge: { value: FaBatteryFull },
  others: { value: TbArrowsRandom },
  refund: { value: HiOutlineReceiptRefund },
  trading: { value: FcNeutralTrading },
};

type TImageIcon = {
  [key: string]: {
    value: string;
  };
};

export const ImageIcon: TImageIcon = {
  salary: { value: transactionIcon },
  investing: { value: investing },
  freelancing: { value: freelancing },
  sports: { value: sports },
  gift: { value: gift },
  business: { value: business },
  foods: { value: foods },
  entertainments: { value: enjoy },
  education: { value: education },
  wishes: { value: wishes },
  electronics: { value: electronic },
  travel: { value: travel },
  shopping: { value: shopping },
  rent: { value: rent },
  recharge: { value: recharge },
  others: { value: others },
  refund: { value: refund },
  trading: { value: trading },
};

export const transactionType = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Income",
  },
  {
    id: 3,
    name: "Expense",
  },
];

export const transactionIconType = [
  {
    id: 1,
    name: "Image",
    value: true,
  },
  {
    id: 2,
    name: "Svg",
    value: false,
  },
];

export const transactionDuration = [
  {
    id: 1,
    name: "Weekly",
    value: "7",
  },
  {
    id: 2,
    name: "15 Days",
    value: "15",
  },
  {
    id: 3,
    name: "Monthly",
    value: "30",
  },
];
