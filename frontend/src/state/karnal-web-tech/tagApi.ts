import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure /react is imported

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const karnal_TagApi = createApi({
  reducerPath: "karnal_TagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = cookiesManager.get("token"); // Get token from cookies
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Tag-karnal"],
  endpoints: (builder) => ({
    addNewTag: builder.mutation<any, any>({
      query: (data) => {
        const formData = new FormData();
        for (let [key, value] of Object.entries(data)) {
          if (key === "images" && Array.isArray(value)) {
            // Assuming 'images' is an array of files, append each file separately
            value.forEach((file: any) => formData.append("images", file));
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());

            // For all other fields, just append key-value pairs
          }
        }
        return {
          url: "v2/tag/add",
          method: "POST",

          body: formData, // Use formData as body
        };
      },
      invalidatesTags: [{ type: "Tag-karnal", id: "LIST" }],
    }),
    update: builder.mutation<any, any>({
      query: (data) => {
        console.log(data);
        const formData = new FormData();
        for (let [key, value] of Object.entries(data)) {
          if (key === "images" && Array.isArray(value)) {
            // Assuming 'images' is an array of files, append each file separately
            value.forEach((file: any) => formData.append("images", file));
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());

            // For all other fields, just append key-value pairs
          }
        }
        return {
          url: "v2/tag/update",
          method: "PUT",
          body: formData, // Use formData as body
        };
      },
      invalidatesTags: [{ type: "Tag-karnal", id: "LIST" }],
    }),
    getSingle: builder.query<any, string>({
      query: (id: string) => ({
        url: `v2/tag/data/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Tag-karnal", id: "LIST" }],
    }),
    deleteTag: builder.mutation<any, any>({
      query: (id) => ({
        url: `v2/tag/data/${id}`,
        method: "DELETE", // Use DELETE instead of PUT
      }),
      invalidatesTags: [{ type: "Tag-karnal", id: "LIST" }],
    }),
    getAllTag: builder.query<
      any,
      {
        type?: string;
        rowsPerPage?: number;
        page?: number;
      } | void
    >({
      query: (filters) => {
        // Initialize the query params object with the default value for isActive
        const params: Record<string, string | number | boolean> = {
          // is_active: filters.is_active, // Default to true
        };
        // Add filters to the query parameters if they are present
        if (filters) {
          if (filters.type) {
            params.type = filters.type; // Convert number to string
          }
          if (filters.rowsPerPage) {
            params.rowsPerPage = filters.rowsPerPage; // Convert number to string
          }
          if (filters.page) {
            params.page = filters.page; // Convert number to string
          }
        }

        return {
          url: "v2/tag",
          params, // Use the dynamically constructed params
          method: "GET",
        };
      },
      providesTags: [{ type: "Tag-karnal", id: "LIST" }],
    }),
  }),
});

// Correct hook name generated by createApi
export const {
  useAddNewTagMutation,
  useGetAllTagQuery,
  useGetSingleQuery,
  useUpdateMutation,
  useDeleteTagMutation,
} = karnal_TagApi;