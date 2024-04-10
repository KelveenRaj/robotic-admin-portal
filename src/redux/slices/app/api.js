import { baseApiSlice } from "../../createAppApi";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCentres: builder.query({
        query: () => ({
          url: "/center",
        }),
      }),
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
    };
  },
});

export const {
  useGetCentresQuery,
  useGetUserDataQuery,
  useGetStudentListQuery,
  useApproveStudentMutation,
  useRejectStudentMutation,
} = appApi;
