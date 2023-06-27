import { contextType } from "../Types/type";
import { User } from "../Interface/interface";

// * Auth Context data
export const initialState = {
  name: "",
  email: "",
  password: "",
  image: null,
  bio: "",
};

export const contextState: contextType = {
  formData: initialState,
  setFormData: () => {},
  handleChange: () => {},
  handleCreateUser: () => {},
  loading: false,
  handleUpdateUser: () => {},
  handleLoginUser: () => {},
  loginLoading: false,
  userData: {} as User,
  updateLoading: false,
  editUserData: {} as User,
  setEditUserData: () => {},
};
