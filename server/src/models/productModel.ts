import mongoose, { Document, Types, Model, Schema } from "mongoose";

export interface Iproduct extends Document {
  prod_id: string;
  name?: string;
  status?: string;
  selling_price?: string;
  tax?: string;
  primary_unit?: string;
  sku?: string;
  hsn?: string;
  purchase_price?: string;
  categorie?: Types.ObjectId;
  total_quantity?: string;
  barcode?: string;
  weight?: string;
  depth?: string;
  width?: string;
  height?: string;
  description: string;
  images_id: Types.ObjectId;
  audit_log: Types.ObjectId;
  is_active?: string; // Optional field
  is_delete?: string; // Optional field
}

const productschema: Schema<Iproduct> = new mongoose.Schema(
  {
    prod_id: {
      type: String,
      trim: true,
      default: null,
    },
    name: {
      type: String,
      trim: true,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    selling_price: {
      type: String,
      default: null,
    },
    tax: {
      type: String,
      default: null,
    },
    primary_unit: {
      type: String,
      default: null,
    },
    sku: {
      type: String,
      default: null,
    },
    hsn: {
      type: String,
      default: null,
    },
    purchase_price: {
      type: String,
      default: null,
    },
    categorie: {
      type: Schema.Types.ObjectId,
      ref: "Images",
    },

    total_quantity: {
      type: String,
      default: null,
    },
    barcode: {
      type: String,
      default: null,
    },
    weight: {
      type: String,
      default: null,
    },
    depth: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    images_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Images",
      },
    ],
    status: {
      type: String,
      default: "active",
    },
    audit_log: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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

const Product_model: Model<Iproduct> = mongoose.model<Iproduct>(
  "categorie",
  productschema
);
export default Product_model;
