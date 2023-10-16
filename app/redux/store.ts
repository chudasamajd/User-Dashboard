import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import validAccountReducer from "./features/validAccountSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { authReducer, validAccountReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
