import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user/all",
    }),
    getOneUser: builder.query({
      query: () => `/user/me`,
      keepUnusedDataFor: 1,
      providesTags: ["Avatar"],
    }),
    updateAvatarUser: builder.mutation({
      query: (avatar) => ({
        url: `/user/profile`,
        method: "PATCH",
        body: { ...avatar },
      }),
      invalidatesTags: ["Avatar"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetOneUserQuery,
  useUpdateAvatarUserMutation,
} = usersApiSlice;
