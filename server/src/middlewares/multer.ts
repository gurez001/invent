import multer from "multer";
import { Request } from "express"; // Import Request type from express

// Define the storage configuration
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "src/uploads/"); // Specify the destination directory for uploaded files
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + "-" + file.originalname); // Prepend timestamp to the original file name
  },
});

// Create the upload middleware with file size limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
});
    
// Export the upload middleware
export default upload;
