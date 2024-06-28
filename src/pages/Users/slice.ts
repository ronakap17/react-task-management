import { createSlice } from "@reduxjs/toolkit";
import { User } from "~/types/user";
import { fetchUsers } from "./actions";
import { DataWithPagination } from "~/types/pagination";

type initialStateType = {
  list: User[];
  paginate: Omit<DataWithPagination<User>, 'data'>
  fetching: boolean;
};

const initialState: initialStateType = {
  list: [],
  paginate: {
    currentPage: 0,
    from:0,
    to: 0,
    lastPage: 0,
    perPage: 0,
    total: 0
  },
  fetching: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.fetching = false;

        const {data, ...pagenate} = payload;
        state.list = data;
        state.paginate = pagenate;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.fetching = false;
      });
  },
});

export const userActions = usersSlice.actions;
export default usersSlice.reducer;
