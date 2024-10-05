import { NextFunction } from "express";
import ErrorHandler from "./ErrorHandler"; // Ensure this is correct
import { initFirebase } from "../firebase";

export class ImageUploader {
  // Function to handle image uploads
  async uploadImage(files: any, next: NextFunction) {
    if (!files || !Array.isArray(files) || files.length === 0) {
      return next(new ErrorHandler("No files uploaded.", 400));
    }

    const uploadPromises = files.map(async (file) => {
      if (!file.buffer) {
        console.error("File buffer is missing for file:", file);
        return next(new ErrorHandler("File buffer is missing.", 400));
      }

      const bucket = await initFirebase();
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      return new Promise((resolve, reject) => {
        blobStream.on("error", (error) => {
          console.error("Blob Stream Error:", error);
          reject(error);
        });

        blobStream.on("finish", () => {
          resolve({
            success: true,
            file: file.originalname,
            url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
          });
        });

        blobStream.end(file.buffer); // Using the buffer to upload the file
      });
    });

    try {
      return await Promise.all(uploadPromises);
    } catch (error: any) {
      console.error("Upload Error:", error); // Log the error
      return next(new ErrorHandler(error.message, 500));
    }
  }
}
