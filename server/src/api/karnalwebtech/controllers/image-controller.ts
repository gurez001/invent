import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../../middlewares/AsyncHandler";
import ImageRepository from "../../../utils/comman-repositories/imageRepository";
import User from "../../../models/primary/userModel";

class ImageController {
  constructor(private imageRepository: ImageRepository) {}
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
  // Get all categories with pagination
  all = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query;
      const resultPerPage = Number(query.rowsPerPage) || 25;

      // Fetch tag and data counter
      const [result, dataCounter] = await Promise.all([
        this.imageRepository.all(query,"karnalwebtech",User),
        this.imageRepository.data_counter(query,"karnalwebtech"),
      ]);

      return this.sendResponse(res, "image fetched successfully", 200, {
        result,
        resultPerPage,
        dataCounter,
      });
    }
  );

}

export default ImageController;
