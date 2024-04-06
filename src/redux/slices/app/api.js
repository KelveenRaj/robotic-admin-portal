import { baseApiSlice } from "../../createAppApi";

export const appApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getActiveCentres: builder.query({
        query: () => ({
          url: "center?status=Assigned",
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
    };
  },
});

export const {
  useGetActiveCentresQuery,
  useGetUserDataQuery,
  useGetStudentListQuery,
} = appApi;
