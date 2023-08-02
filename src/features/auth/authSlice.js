import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;
      state.email = email;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.persistedReducer.auth.email;
export const selectCurrentToken = (state) => state.persistedReducer.auth.token;
