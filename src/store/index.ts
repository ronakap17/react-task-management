import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import layoutReducer from "./../layouts/slice";
import formReducer from "~/components/Form/slice";
import authReducer from "~/pages/Auth/slice";
import appDataReducer from "~/app/slice";
import usersReducer from "~/pages/Users/slice";

export const store = configureStore({
  reducer: {
    appData: appDataReducer,
    layout: layoutReducer,
    form: formReducer,
    auth: authReducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
