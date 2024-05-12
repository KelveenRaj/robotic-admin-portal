import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    headers.set("Authorization", `Bearer ${token?.accessToken}`);
    return headers;
  },
});

export const baseApiSlice = createApi({
  baseQuery,
  endpoints: () => {
    return {};
  },
});
