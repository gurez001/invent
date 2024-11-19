import { NextFunction } from "express";
import ErrorHandler from "../ErrorHandler";
import { getSeoModel } from "../models-handler/seo-model-handler";

class SeoRepositorie {
  create(data: any, image_uploader: any, next: NextFunction) {
    const ogImageUrl = image_uploader?.[0]?.url || ""; // Fallback to an empty string if undefined
    let keywordsArray = data.keywords.split(",");
    try {
      const seo_data = {
        title: data.metaTitle || data.title,
        meta_description: data.metaDescription || "Karnal web tech",
        keywords: keywordsArray || "",
        og_title: data.metaTitle || data.title,
        og_description: data.metaDescription || "Karnal web tech",
        og_image: ogImageUrl,
        twitter_card: "summary_large_image",
        twitter_title: data.metaTitle || data.title,
        twitter_description: data.metaDescription || "Karnal web tech",
        twitter_image: ogImageUrl,
        canonical_url: data.metaCanonicalUrl || "",
      };
      const seo = getSeoModel("karnalwebtech").create(seo_data);
      return seo;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 404));
      }

      // For non-Error objects, handle it gracefully
      return next(new ErrorHandler("An unknown error occurred", 404));
    }
  }
}
export default new SeoRepositorie();
