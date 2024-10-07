import { z } from "zod";

export const productTypeFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required and cannot be empty" }),
  status: z
    .string()
    .min(1, { message: "Status is required and cannot be empty" }),
  selling_price: z
    .string({ invalid_type_error: "Selling price must be a string" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Selling price must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Selling price must be greater than zero",
    }),
  primary_unit: z
    .string()
    .min(1, { message: "Primary unit is required and cannot be empty" }),
  sku: z
    .string()
    .min(1, { message: "SKU is required and cannot be empty" })
    .optional(),
  hsn: z
    .string()
    .min(1, { message: "HSN is required and cannot be empty" })
    .optional(),
  purchase_price: z
    .string({ invalid_type_error: "Purchase price must be a string" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Purchase price must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Purchase price must be greater than zero",
    }),
  categorie: z
    .string()
    .min(1, { message: "Category is required and cannot be empty" }),
  total_quantity: z
    .string({ invalid_type_error: "Total quantity must be a string" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Total quantity must be a valid integer",
    })
    .refine((val) => Number(val) > 0 && Number.isInteger(Number(val)), {
      message: "Total quantity must be a positive integer",
    })
    .optional(),
  barcode: z
    .string()
    .min(1, { message: "Barcode is required and cannot be empty" })
    .optional(),
  weight: z
    .string({ invalid_type_error: "Weight must be a string" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Weight must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Weight must be greater than zero",
    })
    .optional(),
  depth: z
    .string({ invalid_type_error: "Depth must be a string" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Depth must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Depth must be greater than zero",
    })
    .optional(),
  width: z
    .string({ invalid_type_error: "Width must be a string" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Width must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Width must be greater than zero",
    })
    .optional(),
  height: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Height must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Height must be greater than zero",
    })
    .optional(),
});
