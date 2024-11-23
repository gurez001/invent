import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../../middlewares/AsyncHandler";
import ErrorHandler from "../../../utils/ErrorHandler";
import TagService from "../../../services/karnalwebtech/tag-service";

class TagController {
  constructor(private tagService: TagService) {}

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

  // Create tag with error handling and cleaner response
  create = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = (req as any).user?._id; // Use the correct type for the request user
      const files = req.files;

      // Check if URL already exists
      const isExistingUrl = await this.tagService.findByUrl(
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

      // Create category
      const result = await this.tagService.create(
        req.body,
        files,
        userId,
        next
      );
      if (result) {
        return this.sendResponse(res, "Tag created successfully", 201);
      }

      return next(new ErrorHandler("Failed to create category", 500));
    }
  );

  // Get all categories with pagination
  all = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query;
      const resultPerPage = Number(query.rowsPerPage);

      // Fetch tag and data counter
      const [result, dataCounter] = await Promise.all([
        this.tagService.all(query),
        this.tagService.data_counter(query),
      ]);

      return this.sendResponse(res, "Tag fetched successfully", 200, {
        result,
        resultPerPage,
        dataCounter,
      });
    }
  );

  // Get single tag by ID
  get_single_data = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      if (!id) {
        return next(new ErrorHandler("ID parameter is required.", 400));
      }

      // Fetch tag by ID
      const result = await this.tagService.findBYpageid(id, next);
      if (result) {
        return this.sendResponse(res, "Tag fetched successfully", 200, result);
      }

      return next(new ErrorHandler("Tag not found", 404));
    }
  );

  // Update category
  update = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: string = (req as any).user._id;
      const files = req.files;

      if (!user) {
        return next(new ErrorHandler("User not authenticated", 401)); // Changed to 401
      }

      // Update Tag
      const result = await this.tagService.update(req.body, files, user, next);
      if (result) {
        return this.sendResponse(res, "Tag updated successfully", 200);
      }

      return next(new ErrorHandler("Failed to update tag", 500));
    }
  );
  removeItem = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const id: string = req.params.id;
      const categorie = await this.tagService.removeItem(id, next);
      if (categorie) {
        return res.status(200).json({
          succes: true,
        });
      }
    }
  );
}

export default TagController;
