/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "../Interface/interface";

export type TFormData = {
  name: string;
  email: string;
  password: string;
  image: any;
  bio: string;
};

export type TContext = {
  formData: TFormData;
  setFormData: React.Dispatch<React.SetStateAction<TFormData>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateUser: () => void;
  loading: boolean;
  handleUpdateUser: () => void;
  handleLoginUser: () => void;
  loginLoading: boolean;
  userData: IUser | undefined;
  updateLoading: boolean;
  editUserData: IUser | undefined;
  setEditUserData: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  logoutUser: () => void;
};
