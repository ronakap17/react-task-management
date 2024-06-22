import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppSidebarState {
  isOpen: boolean;
}

const initialState: AppSidebarState = {
  isOpen: localStorage.getItem("isLeftSidebarOpen")
    ? JSON.parse(localStorage.getItem("isLeftSidebarOpen") || "")
    : false,
};

const appSidebarSlice = createSlice({
  name: "appSidebar",
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<boolean | undefined>) {
      const isOpen =
        action.payload !== undefined ? action.payload : !state.isOpen;
      state.isOpen = isOpen;
      localStorage.setItem("isLeftSidebarOpen", `${isOpen}`);
    },
  },
});

export const appSidebarActions = appSidebarSlice.actions;
export default appSidebarSlice.reducer;
