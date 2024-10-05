import { NextFunction } from "express";
import ImageModel from "../models/imageModel";

class ImageRepository {
  async createImage(data: any, next: NextFunction) {
    try {
      const images = data.map((image: any) => {
        return {
          fieldname: image.fieldname,
          originalname: image.originalname,
          encoding: image.encoding,
          mimetype: image.mimetype,
          destination: image.destination,
          filename: image.filename,
          path: image.path,
          size: image.size,
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
