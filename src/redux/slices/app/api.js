import { baseApiSlice } from "../../createAppApi";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUserData: builder.query({
        query: () => ({
          url: "/user",
        }),
      }),
      getStudentList: builder.query({
        query: () => ({
          url: "/users?role=student",
        }),
      }),
      getCentresList: builder.query({
        query: () => ({
          url: "/center",
        }),
      }),
      approveStudent: builder.mutation({
        query: ({ id, body }) => ({
          url: `/user/${id}/approve`,
          method: "POST",
          body: body,
        }),
      }),
      rejectStudent: builder.mutation({
        query: ({ id }) => ({
          url: `/user/${id}/reject`,
          method: "POST",
        }),
      }),
      createCentre: builder.mutation({
        query: ({ body }) => ({
          url: `/center`,
          method: "POST",
          body: body,
        }),
      }),
    };
  },
});

export const {
  useGetCentresListQuery,
  useGetUserDataQuery,
  useGetStudentListQuery,
  useApproveStudentMutation,
  useRejectStudentMutation,
  useCreateCentreMutation,
} = appApi;
