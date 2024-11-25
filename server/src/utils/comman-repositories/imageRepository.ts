import { NextFunction } from "express";
import { getImageModel } from "../models-handler/image-model-handler";
import ApiFeatures from "../apiFeatuers";

class ImageRepository {
  async createImage(
    data: any,
    image_uploader: any,
    user_id: string,
    next: NextFunction,
    image_key: string = "crm"
  ) {
    try {
      // Create an array to hold image objects
      const images_arr: any[] = [];
      const counter = await getImageModel(image_key).countDocuments();
      // Check if data is an array or an object
      if (Array.isArray(data)) {
        // Handle the case when data is an array

        data.forEach((image: any, i: number) => {
          images_arr.push({
            _no: counter + 1 + i,
            fieldname: image.fieldname,
            originalname: image.originalname,
            encoding: image.encoding,
            mimetype: image.mimetype,
            destination: image.destination,
            filename: image.filename,
            path: image_uploader[i]?.url || "", // Use optional chaining to avoid errors
            size: image.size,
            audit_log: user_id,
          });
        });
      } else if (typeof data === "object" && data !== null) {
        // Handle the case when data is an object
        Object.entries(data).forEach(([key, value], entryIndex) => {
          if (Array.isArray(value)) {
            value.forEach((image: any, i: number) => {
              images_arr.push({
                _no: counter + 1 + i,
                fieldname: key,
                originalname: image.originalname,
                encoding: image.encoding,
                mimetype: image.mimetype,
                destination: image.destination,
                filename: image.filename,
                path: image_uploader[entryIndex]?.url || "", // Use optional chaining to avoid errors
                size: image.size,
                audit_log: user_id,
              });
            });
          }
        });
      } else {
        return next(new Error("Invalid data format.")); // Handle the case with invalid data format
      }

      // Insert multiple images into the database if images_arr is populated
      if (images_arr.length > 0) {
        const createdImages = await getImageModel(image_key).insertMany(
          images_arr
        ); // Insert the accumulated images array
        return createdImages; // Return saved images
      } else {
        return next(new Error("No images to insert.")); // Handle the case with no images
      }
    } catch (error) {
      next(error); // Handle the error
    }
  }
  async all(query: any, image_key: string, User: any) {
    const resultPerPage = Number(query.rowsPerPage);
    const apiFeatures = new ApiFeatures(
      getImageModel(image_key).find({ is_delete: { $ne: true } }),
      query
    );
    apiFeatures.search().filter().sort().pagination(resultPerPage);

    // Apply population and execute query
    const result = await apiFeatures
      .getQuery()
      .populate([
        { path: "audit_log", model: User },
        { path: "seo", model: "Karnal_web_seo" },
      ])
      .sort({ updated_at: -1 })
      .exec();

    return result;
  }
  async data_counter(query: any, image_key: any) {
    const apiFeatures = new ApiFeatures(
      getImageModel(image_key).find({ is_delete: { $ne: true } }),
      query
    );
    apiFeatures.search().filter();
    const result = await apiFeatures.exec();
    return result.length;
  }
}

export default ImageRepository;
