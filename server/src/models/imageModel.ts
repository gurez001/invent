import mongoose, { Document, Model, Types, Schema } from "mongoose";

// Define the Iimages interface to match the image data structure
export interface IImages extends Document {
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  path: string;
  size: number;
  altText: string;
  title: string;
  caption: string;
  audit_log: Types.ObjectId;
  status: string;
  is_active?: string; // Optional field
  is_delete?: string;
}

// Define the image schema
const imageSchema: Schema<IImages> = new mongoose.Schema(
  {
    originalname: {
      type: String,
      default: null,
    },
    encoding: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: null,
    },
    altText: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    caption: {
      type: String,
      default: null,
    },
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

// Create and export the Image model
const ImageModel: Model<IImages> = mongoose.model<IImages>(
  "Images",
  imageSchema
);

export default ImageModel;
