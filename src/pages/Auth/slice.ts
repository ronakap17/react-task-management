import { createSelector, createSlice } from "@reduxjs/toolkit";
import { User } from "~/types/user";
import { userLogin } from "./actions";
import { RootState } from "~/store";

type initialStateType = {
  token: string | null;
  user: User;
};

const emptyUser: User = {
  id: null,
  email: "",
  name: "",
  email_verified_at: null,
  created_at: null,
  updated_at: null,
};

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userData: User = localStorage.getItem("currentUser")
  ? (JSON.parse(localStorage.getItem("currentUser") as string) as User)
  : emptyUser;
const initialState: initialStateType = {
  token: userToken,
  user: userData,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = userData;
      state.token = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      const { token, user } = payload;
      localStorage.setItem("userToken", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      state.token = token;
      state.user = user;
    });
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;

export const isUserAuthenticated = createSelector(
  (state: RootState) => state.auth,
  (auth: initialStateType) => !!auth.token && auth.user.id
);
