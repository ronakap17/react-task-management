import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthAPI } from "~/api/auth";
import { AppError } from "~/types/app";
import { LoginPayload, LoginResponsePayload, UserDetailsResponsePayload } from "~/types/user";

export const userLogin = createAsyncThunk<LoginResponsePayload, LoginPayload>(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(AuthAPI.login, { email, password });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const userRegister = createAsyncThunk<LoginResponsePayload, FormData>(
  "auth/register",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(AuthAPI.register, payload);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const refreshToken = createAsyncThunk<LoginResponsePayload, void, { rejectValue: AppError }>(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(AuthAPI.refreshToken);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const userDetails = createAsyncThunk<UserDetailsResponsePayload, void>(
  "auth/userDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(AuthAPI.userDetails);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);