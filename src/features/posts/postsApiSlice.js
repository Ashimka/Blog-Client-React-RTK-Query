import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
      keepUnusedDataFor: 0.1,
    }),
    getFullPost: builder.query({
      query: (id) => `/post/${id}`,
      keepUnusedDataFor: 0.1,
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
      keepUnusedDataFor: 0.1,
    }),
    updatePost: builder.mutation({
      query: (formUpdata) => ({
        url: `/post/${formUpdata.id}/edit`,
        method: "PATCH",
        body: { ...formUpdata },
      }),
      keepUnusedDataFor: 0.1,
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 0.1,
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
    }),
    removeComment: builder.mutation({
      query: (id) => ({
        url: `/post/comment/${id}`,
        method: "DELETE",
      }),
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
