import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import users from "../pages/UsersListPage/UsersListSlice";

const store = configureStore({
  reducer: { users },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
