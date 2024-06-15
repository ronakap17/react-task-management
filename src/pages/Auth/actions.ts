import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginPayload } from "./slice";
import { AuthAPI } from "~/api/auth";

export const userLogin = createAsyncThunk(
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
