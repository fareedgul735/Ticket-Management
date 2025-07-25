import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.userId = payload;
      state.role = payload.role;
    },
    logoutUser: (state) => {
      state.userId = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
export default userReducer;
