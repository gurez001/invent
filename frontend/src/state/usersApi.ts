import { Login, Sign_up, User_Data } from "@/types/auth_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AnyARecord } from "dns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    loginUser: build.mutation<User_Data, Login>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST", // or 'GET' based on your API requirement
      }),
    }),
    profile: build.mutation<User_Data, Login>({
      query: (data) => ({
        url: "/auth/profile",
        method: "POST",
        body: data,
      }),
    }),
    sign_up_user: build.mutation<User_Data, Sign_up>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useProfileMutation,
  useSign_up_userMutation,
  useLogoutMutation,
} = usersApi;
