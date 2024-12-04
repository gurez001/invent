import { NextFunction, Request, Response } from "express";
import PostModel from "../../models/karnalwebtech/post-model";
import ErrorHandler from "../ErrorHandler";
import PostCategorieModel from "../../models/karnalwebtech/post-categorie";

class PostService {
  static async getPostUrls(req: Request, res: Response, next: NextFunction) {
    try {
      const urls = await PostModel.find(
        { is_delete: { $ne: true } },
        { slug: 1, categorie: 1, updatedAt: 1, _id: 0 }
      ).populate({
        path: "categorie",
        select: "slug -_id",
      });
      return res.status(200).json(urls);
    } catch (error) {
      return next(new ErrorHandler(`Error fetching URLs: ${error}`, 404));
    }
  }
  static async getCategorieUrls(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const urls = await PostCategorieModel.find(
        { is_delete: { $ne: true } },
        { slug: 1, updatedAt: 1, _id: 0 }
      );
      return res.status(200).json(urls);
    } catch (error) {
      return next(new ErrorHandler(`Error fetching URLs: ${error}`, 404));
    }
  }
  
}

export default PostService;
