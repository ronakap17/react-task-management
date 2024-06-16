import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthAPI } from "~/api/auth";
import { LoginPayload, LoginResponsePayload } from "~/types/user";

export const userLogin = createAsyncThunk<LoginResponsePayload, LoginPayload>(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(AuthAPI.login, { email, password });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
