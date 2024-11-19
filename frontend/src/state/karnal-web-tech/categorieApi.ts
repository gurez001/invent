import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { categorie_form, categorie_list } from "@/types/categorie_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure /react is imported

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const karnal_CategorieApi = createApi({
  reducerPath: "karnal_CategorieApi",
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
  tagTypes: ["Categorie-karnal"],
  endpoints: (builder) => ({
    addNewCategorie: builder.mutation<any, any>({
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
          url: "v2/categorie/add",
          method: "POST",
          body: formData, // Use formData as body
        };
      },
      invalidatesTags: [{ type: "Categorie-karnal", id: "LIST" }],
    }),
  }),
});

// Correct hook name generated by createApi
export const { useAddNewCategorieMutation } = karnal_CategorieApi;
