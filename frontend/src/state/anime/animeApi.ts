import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure /react is imported

const apiUrl = process.env.NEXT_PUBLIC_API_URL_2;
const apKey = process.env.NEXT_PUBLIC_API_KEY;

export const anime_Api = createApi({
  reducerPath: "anime_Api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = cookiesManager.get("token"); // Get token from cookies
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      if (apKey) {
        headers.set("x-api-key", apKey); // Set the Authorization header
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["anime-series"],
  endpoints: (builder) => ({
    addnew: builder.mutation<any, any>({
      query: (data) => {
        const formData = new FormData();
        for (let [key, value] of Object.entries(data)) {
          if (key === "images" && Array.isArray(value)) {
            // Assuming 'images' is an array of files, append each file separately
            value.forEach((file: any) => formData.append("images", file));
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        }
        return {
          url: "/v1/anime/",
          method: "POST",
          body: formData, // Use formData as body
        };
      },
      invalidatesTags: [{ type: "anime-series", id: "LIST" }],
    }),
  }),
});

// Correct hook name generated by createApi
export const { useAddnewMutation } = anime_Api;
