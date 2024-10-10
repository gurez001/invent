import mongoose, { Document, Types, Model, Schema } from "mongoose";

export interface Icategory extends Document {
  cat_id: string;
  name: string;
  description: string;
  images_id: Types.ObjectId;
  status: string;
  audit_log: Types.ObjectId;
  is_active?: string; // Optional field
  is_delete?: string; // Optional field
}

const categorieSchema: Schema<Icategory> = new mongoose.Schema(
  {
    cat_id: {
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

const Categorie_model: Model<Icategory> = mongoose.model<Icategory>(
  "Categorie",
  categorieSchema
);
export default Categorie_model;
