import mongoose, { Document, Model, Schema } from "mongoose";
import { thardConnection } from "../../loaders/config";

export interface IImage extends Document {
  _no: number;
  filename: string;
  original_filename: string;
  file_size: number;
  width: number;
  height: number;
  format: string;
  color_space: string;
  is_public: boolean;
  folder: string;
  seo: mongoose.Types.ObjectId;
  url: string;
  secure_url: string;
  cloud_id: string;
  asset_id: string;
  signature: string;
  original_extension: string;
  user_id: mongoose.Types.ObjectId;
  is_active: boolean;
  is_deleted: boolean;
}

const ImageSchema: Schema = new Schema(
  {
    _no: { type: Number, required: true, unique: true },
    filename: { type: String, required: true },
    original_filename: { type: String, required: true },
    file_size: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    format: { type: String, required: true },
    color_space: { type: String },
    is_public: { type: Boolean, default: true },
    folder: { type: String },
    url: { type: String, required: true },
    secure_url: { type: String, required: true },
    cloud_id: { type: String, required: true, unique: true },
    asset_id: { type: String, required: true, unique: true },
    signature: { type: String, required: true },
    original_extension: { type: String, required: true },
    seo: { type: Schema.Types.ObjectId, ref: "Karnal_web_seo" },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ImageModel: Model<IImage> = thardConnection.model<IImage>(
  "Karnal_web_Image",
  ImageSchema
);

export default ImageModel;
