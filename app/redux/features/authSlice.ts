import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  user: AuthValueType;
};

type AuthValueType = {
  isAuth: boolean;
  username: string;
  userId: string;
};

const initialState = {
  user: {
    isAuth: false,
    username: "",
    userId: "",
  } as AuthValueType,
} as InitialStateType;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (_, action: PayloadAction<string>) => {
      return {
        user: {
          isAuth: true,
          username: action.payload,
          userId: "test",
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
