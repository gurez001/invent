import { Login, Sign_up, User_Data } from "@/types/auth_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getTokenFromCookies = () => {
  const cookies = new Cookies();
  const token = cookies.get("auth_token");
  return token; // Replace 'token' with your cookie name
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = getTokenFromCookies(); // Get token from cookies
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    loginUser: build.mutation<User_Data, Login>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
        credentials: "include", 
      }),
    }),
    profile: build.mutation<User_Data, Login>({
      query: (data) => ({
        url: "/auth/profile",
        method: "POST",
        body: data,
        credentials: "include", 
      }),
    }),
    sign_up_user: build.mutation<User_Data, Sign_up>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
        credentials: "include", 
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useProfileMutation,
  useSign_up_userMutation,
} = usersApi;
