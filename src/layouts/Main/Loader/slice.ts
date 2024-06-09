import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppLoaderState {
  loading: boolean;
}

const initialState: AppLoaderState = {
  loading: false,
};

const appLoaderSlice = createSlice({
  name: "appLoader",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload !== undefined ? action.payload : !state.loading;
    },
  },
});

export const appLoaderActions = appLoaderSlice.actions;
export default appLoaderSlice.reducer