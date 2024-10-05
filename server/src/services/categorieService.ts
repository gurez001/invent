import { NextFunction } from "express";
import CategorieRepository from "../repositories/categorieRepository";
import ErrorHandler from "../utils/ErrorHandler";

class CategorieService {
  constructor(private categorieRepository: CategorieRepository) {}

  async add_new_category(
    data: any,
    files: any,
    user_id: string,
    next: NextFunction
  ) {
    const existing_name = await this.categorieRepository.findByName(data.name);
    if (!existing_name) {
      return next(
        new ErrorHandler("Categorie with this Name already exists", 400)
      );
    }
    return await this.categorieRepository.createCategorie(data,files, user_id,next);
  }
}
export default CategorieService;
