import { z } from 'zod';

export const purchase_schema = z.object({
    vendor: z.string().min(1, { message: "Vendor is required" }),
    purchase_date: z.string().min(1, { message: "Purchase date is required" }),
    due_date: z.string().min(1, { message: "Due date is required" }),
    reference: z.string().optional(),
    supplier_invoice_serial_no: z.string().optional(),
    supplier_invoice_date: z.string().min(1, { message: "Supplier invoice date is required" }),
    // price_with_tax: z.number().min(1, { message: "Price with tax is required" }),
    // discount: z.number().min(1, { message: "Discount is required" }),
    // // net_amount: z.number().min(1, { message: "Net amount is required" }),
    // // total: z.number().min(1, { message: "Total is required" }),
    // shipping_charges: z.number().min(1, { message: "Shipping charges is required" }),
    // quantity: z.number().min(1, { message: "Quantity is required" }),
    // packaging_charges: z.number().min(1, { message: "Packaging charges is required" }),
    // product_name: z.string().min(1, { message: "Product name is required" }),
    // unit_price: z.number().min(1, { message: "Unit price is required" }),
});

