import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { login: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { login, accessToken } = action.payload;
      state.login = login;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.login = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.persistedReducer.auth.login;
export const selectCurrentToken = (state) => state.persistedReducer.auth.token;
