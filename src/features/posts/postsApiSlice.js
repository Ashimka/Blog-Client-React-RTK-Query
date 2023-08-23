import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
      providesTags: ["PostsList"],
    }),
    getFullPost: builder.query({
      query: (id) => `/post/${id}`,
      providesTags: ["PostsList", "CommentsList"],
    }),
    getCategoryPosts: builder.query({
      query: (cat) => `/post?category=${cat}`,
      keepUnusedDataFor: 0.1,
    }),
    uploadImage: builder.mutation({
      query: (file) => ({
        url: "/upload",
        method: "POST",
        body: file,
      }),
      keepUnusedDataFor: 0.1,
    }),
    createNewPost: builder.mutation({
      query: (formData) => ({
        url: "/post",
        method: "POST",
        body: { ...formData },
      }),
      invalidatesTags: ["PostsList"],
    }),
    updatePost: builder.mutation({
      query: (formUpdata) => ({
        url: `/post/${formUpdata.id}/edit`,
        method: "PATCH",
        body: { ...formUpdata },
      }),
      invalidatesTags: ["PostsList"],
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PostsList"],
    }),
    createTags: builder.mutation({
      query: (cat) => ({
        url: "/post/cats",
        method: "POST",
        body: { ...cat },
      }),
    }),
    getTagsList: builder.query({
      query: () => "/post/cats",
    }),
    createComment: builder.mutation({
      query: (comment) => ({
        url: `/post/${comment.id}/comments`,
        method: "POST",
        body: { ...comment },
      }),
      invalidatesTags: ["CommentsList"],
    }),
    removeComment: builder.mutation({
      query: (id) => ({
        url: `/post/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CommentsList"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFullPostQuery,
  useUploadImageMutation,
  useCreateNewPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
  useCreateTagsMutation,
  useGetTagsListQuery,
  useCreateCommentMutation,
  useRemoveCommentMutation,
  useGetCategoryPostsQuery,
} = postsApiSlice;
