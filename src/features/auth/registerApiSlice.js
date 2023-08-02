import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}` }),
  endpoints: (builder) => ({
    newUser: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
  }),
});
export const { useNewUserMutation } = registerApi;
