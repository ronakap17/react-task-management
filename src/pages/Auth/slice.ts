import { createSlice } from "@reduxjs/toolkit";
import { User } from "~/types/user";
import { userLogin } from "./actions";

type initialStateType = {
  token: string | null;
  user: User;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const initialState: initialStateType = {
  token: userToken,
  user: {
    id: null,
    email: "",
    name: "",
    email_verified_at: null,
    created_at: null,
    updated_at: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {},
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        localStorage.setItem("userToken", payload.userToken);
        state.user = payload;
        state.token = payload.userToken;
      });
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
