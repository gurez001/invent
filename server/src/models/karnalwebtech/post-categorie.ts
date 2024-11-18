import mongoose, { Document, Model, Schema } from "mongoose";
import { thardConnection } from "../../loaders/config";
import slugify from "slugify";

export interface IPost extends Document {
  _no: number;
  title: string;
  slug: string;
  content?: string;
  post_id: string;
  status: boolean;
  audit_log: mongoose.Types.ObjectId;
  feature_image: mongoose.Types.ObjectId;
  seo: mongoose.Types.ObjectId;
  is_active?: boolean;
  is_delete?: boolean;
  meta_description?: string;
  keywords?: string[];
  author?: string;
  generateSlug: () => string;
  generateMetaDescription: () => string;
}

const PostSchema: Schema = new Schema(
  {
    _no: { type: Number, required: true, unique: true },
    title: { type: String, default: null },
    slug: { type: String, unique: true },
    content: { type: String, default: null },
    feature_image: { type: Schema.Types.ObjectId, ref: "Karnal_web_Image" },
    seo: { type: Schema.Types.ObjectId, ref: "Karnal_web_seo" },
    post_id: { type: String, default: null, unique: true },
    status: { type: Boolean, default: true },
    audit_log: { type: Schema.Types.ObjectId, ref: "User" },
    is_active: { type: Boolean, default: true },
    is_delete: { type: Boolean, default: false },
    meta_description: { type: String },
    keywords: [{ type: String }],
    author: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Method to generate slug from title
PostSchema.methods.generateSlug = function (): string {
  return slugify(this.title, { lower: true, strict: true, replacement: "-" });
};

// Method to generate meta description from content
PostSchema.methods.generateMetaDescription = function (): string {
  return this.content ? this.content.substring(0, 160) : "";
};

// Pre-save middleware to set slug and meta description if not provided
PostSchema.pre<IPost>("save", function (next) {
  if (!this.slug) {
    this.slug = this.generateSlug();
  }
  if (!this.meta_description) {
    this.meta_description = this.generateMetaDescription();
  }
  next();
});

// Create and export the model
const PostModel: Model<IPost> = thardConnection.model<IPost>(
  "Post",
  PostSchema
);

export default PostModel;
