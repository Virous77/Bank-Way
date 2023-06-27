/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../Interface/interface";

export type formDataType = {
  name: string;
  email: string;
  password: string;
  image: any;
  bio: string;
};

export type contextType = {
  formData: formDataType;
  setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateUser: () => void;
  loading: boolean;
  handleUpdateUser: () => void;
  handleLoginUser: () => void;
  loginLoading: boolean;
  userData: User | undefined;
  updateLoading: boolean;
  editUserData: User | undefined;
  setEditUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
};
