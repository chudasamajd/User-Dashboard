import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    username: string;
    password: string;
    isAccount: boolean;
  };
}

const initialState: UserState = {
  user: {
    username: "",
    password: "",
    isAccount: false,
  },
};

export const validAccount = createSlice({
  name: "validAccount",
  initialState,
  reducers: {
    removeLoginAccount: () => {
      return initialState;
    },
    setLoginAccount: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        isAccount: boolean;
      }>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setLoginAccount, removeLoginAccount } = validAccount.actions;
export default validAccount.reducer;
