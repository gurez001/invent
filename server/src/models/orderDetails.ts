import mongoose, { Document, Types, Model, Schema } from "mongoose";

export interface IOrderDetails extends Document {
  product_details: {
    type: Schema.Types.Mixed;
    quantity: number;
  }[]; // Array of objects for product details
  is_active?: string; // Optional field
  is_delete?: string; // Optional field
}

const orderDetailsSchema: Schema<IOrderDetails> = new mongoose.Schema(
  {
    product_details: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    is_active: {
      type: String,
      default: "yes",
    },
    is_delete: {
      type: String,
      default: "no",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Order_details_model: Model<IOrderDetails> = mongoose.model<IOrderDetails>(
  "Orders_details",
  orderDetailsSchema
);

export default Order_details_model;
