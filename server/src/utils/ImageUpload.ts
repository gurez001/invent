import { NextFunction } from "express";
import ErrorHandler from "./ErrorHandler"; // Ensure this is correct
import { initFirebase } from "../firebase";

export class ImageUploader {
  // Function to handle image uploads
  async uploadImage(files: any, next: NextFunction) {
    if (!files || !Array.isArray(files) || files.length === 0) {
      return next(new ErrorHandler("No files uploaded.", 400)); // Use next to pass the error
    }

    // Assuming 'images' is the field name for the uploaded files
    const uploadPromises = files.map(async (file) => {
      const bucket = await initFirebase(); // Await here to resolve the Promise
      const blob = bucket.file(file.filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype, // Set the content type
        },
      });

      return new Promise((resolve, reject) => {
        blobStream.on("error", (error) => {
          reject(error);
        });

        blobStream.on("finish", () => {
          resolve({
            success: true,
            file: file.filename,
            url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`, // Construct URL for access
          });
        });

        blobStream.end(file.buffer); // Use file.buffer if you are using multer to handle file uploads
      });
    });

    try {
      // Wait for all uploads to complete
      return await Promise.all(uploadPromises);
    } catch (error:any) {
      // Handle error
      return next(new ErrorHandler(error.message, 500)); // Pass error to next middleware
    }
  }
}
