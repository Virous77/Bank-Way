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
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaBatteryFull } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";

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

type SvgIconType = {
  [key: string]: {
    value: any;
  };
};

export const SvgIcon: SvgIconType = {
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
};

type ImageIconType = {
  [key: string]: {
    value: string;
  };
};

export const ImageIcon: ImageIconType = {
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
};
