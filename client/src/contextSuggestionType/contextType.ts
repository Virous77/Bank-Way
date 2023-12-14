import { TContext } from "../Types/type";
import { IUser } from "../Interface/interface";

// * Auth Context data
export const initialState = {
  name: "",
  email: "",
  password: "",
  image: null,
  bio: "",
};

export const contextState: TContext = {
  formData: initialState,
  setFormData: () => {},
  handleChange: () => {},
  handleCreateUser: () => {},
  loading: false,
  handleUpdateUser: () => {},
  handleLoginUser: () => {},
  loginLoading: false,
  userData: {} as IUser,
  updateLoading: false,
  editUserData: {} as IUser,
  setEditUserData: () => {},
  logoutUser: () => {},
};
