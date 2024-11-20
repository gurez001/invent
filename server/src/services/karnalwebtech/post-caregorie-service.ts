import { NextFunction } from "express";
import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import { ImageUploader } from "../../utils/ImageUpload";
import ErrorHandler from "../../utils/ErrorHandler";
import ImageRepository from "../../repositories/crm/imageRepository";
import seoRepositorie from "../../utils/comman-repositories/seo-repositorie";

const imageUploader = new ImageUploader();
const add_image = new ImageRepository();

class CategorieService {
  constructor(private categorieRepository: CategorieRepository) {}

  // Utility function for centralized error handling
  private handleError(message: string, next: NextFunction, code: number = 404) {
    return next(new ErrorHandler(message, code));
  }

  // Main method to create the category
  async create(data: any, files: any, user_id: string, next: NextFunction) {
    try {
      // Image Upload
      const uploadedImage = await imageUploader.uploadImage(
        files,
        next,
        "karnalwebtech"
      );
      if (!uploadedImage) {
        return this.handleError("Image upload failed on the server", next);
      }

      // Image Data Creation
      const imageData = await add_image.createImage(
        files,
        uploadedImage,
        user_id,
        next,
        "karnalwebtech"
      );
      if (!imageData) {
        return this.handleError("Image not added to database", next);
      }

      // SEO Data Creation
      const seo = await seoRepositorie.create(data, uploadedImage, next);
      if (!seo) {
        return this.handleError("SEO data not added to database", next);
      }

      // Category Creation
      return await this.categorieRepository.create(
        data,
        imageData,
        seo,
        user_id
      );
    } catch (error: any) {
      return next(
        new ErrorHandler(error.message || "Internal Server Error", 500)
      );
    }
  }
  async findByUrl(url: string) {
    return await this.categorieRepository.findByUrl(url);
  }
  async all(query: any) {
    return await this.categorieRepository.all(query);
  }
  async data_counter(query: any) {
    return await this.categorieRepository.data_counter(query);
  }
}

export default CategorieService;
