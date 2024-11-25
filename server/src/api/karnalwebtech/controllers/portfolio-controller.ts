import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../../middlewares/AsyncHandler";
import ErrorHandler from "../../../utils/ErrorHandler";
import PortfoliotService from "../../../services/karnalwebtech/portfolio-service";

class PortfolioController {
  constructor(private portfoliotService: PortfoliotService) {}

  // Helper function to send a consistent response
  private sendResponse(
    res: Response,
    message: string,
    statusCode: number,
    data: any = null
  ) {
    return res.status(statusCode).json({
      success: statusCode < 400,
      message,
      data,
    });
  }

  // Create post with error handling and cleaner response
  create = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = (req as any).user?._id; // Use the correct type for the request user
      const files = req.files;

      // Check if URL already exists
      const isExistingUrl = await this.portfoliotService.findByUrl(
        req.body.metaCanonicalUrl
      );
      if (isExistingUrl) {
        return next(
          new ErrorHandler("Url already exists, try another one", 400)
        ); // Changed to 400
      }

      // Validate user authentication
      if (!userId) {
        return next(new ErrorHandler("User is not authenticated", 401)); // Changed to 401
      }

      // Create post
      const result = await this.portfoliotService.create(
        req.body,
        files,
        userId,
        next
      );
      if (result) {
        return this.sendResponse(res, "image created successfully", 201);
      }

      return next(new ErrorHandler("Failed to create image", 500));
    }
  );

  // Get all post with pagination
  all = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query;
      const resultPerPage = Number(query.rowsPerPage);

      // Fetch post and data counter
      const [result, dataCounter] = await Promise.all([
        this.portfoliotService.all(query),
        this.portfoliotService.data_counter(query),
      ]);

      return this.sendResponse(res, "Post fetched successfully", 200, {
        result,
        resultPerPage,
        dataCounter,
      });
    }
  );

  // Get single post by ID
  get_single_data = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      if (!id) {
        return next(new ErrorHandler("ID parameter is required.", 400));
      }

      // Fetch post by ID
      const result = await this.portfoliotService.findBYpageid(id, next);
      if (result) {
        return this.sendResponse(res, "Post fetched successfully", 200, result);
      }

      return next(new ErrorHandler("Post not found", 404));
    }
  );

  // Update post
  update = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: string = (req as any).user._id;
      const files = req.files;

      if (!user) {
        return next(new ErrorHandler("User not authenticated", 401)); // Changed to 401
      }

      // Update post
      const result = await this.portfoliotService.update(
        req.body,
        files,
        user,
        next
      );
      if (result) {
        return this.sendResponse(res, "Post updated successfully", 200);
      }

      return next(new ErrorHandler("Failed to update post", 500));
    }
  );
  removeItem = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const id: string = req.params.id;
      const result = await this.portfoliotService.removeItem(id, next);
      if (result) {
        return res.status(200).json({
          succes: true,
        });
      }
    }
  );
}

export default PortfolioController;
