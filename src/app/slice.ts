import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppHeaderDataState {
    title?: string,
    backLink?: string,
}

interface AppDataState {
  header: AppHeaderDataState;
}

const defaultHeaderData: AppHeaderDataState = {
    title: '',
    backLink: undefined
}

const initialState: AppDataState = {
    header: defaultHeaderData
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setHeaderData(state, action: PayloadAction<AppHeaderDataState>) {
      state.header = {...defaultHeaderData, ...action.payload};
    },
    clearHeaderData(state) {
        state.header = defaultHeaderData;
    }
  },
});

export const appDataActions = appDataSlice.actions;
export default appDataSlice.reducer