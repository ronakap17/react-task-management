import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import _ from "lodash";
import { UserAPI } from "~/api/user";
import { AppError, FetchRequestPayloadOrVoid } from "~/types/app";
import { DataWithPagination } from "~/types/pagination";
import { User } from "~/types/user";
import { getURLParams } from "~/utils/getURLParams";

// Create a cancel token source
let cancelTokenSource = axios.CancelToken.source();

export const fetchUsers = createAsyncThunk<DataWithPagination<User>, FetchRequestPayloadOrVoid<User>, { rejectValue: AppError }>(
  "users/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      cancelTokenSource.cancel('Operation cancelled by the user.');

      cancelTokenSource = axios.CancelToken.source();
      const params = getURLParams(payload);
      const { data } = await axios.get(UserAPI.listing + params, {cancelToken: cancelTokenSource.token,});
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);