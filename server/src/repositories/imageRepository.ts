import { NextFunction } from "express";
import ImageModel from "../models/imageModel";

class ImageRepository {
  async createImage(
    data: any,
    image_uploader: any,
    user_id: string,
    next: NextFunction
  ) {
    try {
      const images = data.map((image: any, i: number) => {
        return {
          fieldname: image.fieldname,
          originalname: image.originalname,
          encoding: image.encoding,
          mimetype: image.mimetype,
          destination: image.destination,
          filename: image.filename,
          path: image_uploader[i].url,
          size: image.size,
          audit_log: user_id,
        };
      });

      const createdImages = await ImageModel.insertMany(images); // Insert multiple images
      return createdImages; // Return saved images
    } catch (error) {
      next(error);
    }
  }
}

export default ImageRepository;
