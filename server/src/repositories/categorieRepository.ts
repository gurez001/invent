import { NextFunction } from "express";
import Categorie_model from "../models/categorieModel";
import ErrorHandler from "../utils/ErrorHandler";
import { generateRandomId } from "../utils/generateRandomId";
import { FileManager } from "../utils/FileManager";
import ImageRepository from "./imageRepository";
import { ImageUploader } from "../utils/ImageUpload";
const imageUploader = new ImageUploader();
const add_image = new ImageRepository();

class CategorieRepository {
  async createCategorie(
    data: any,
    files: any,
    user_id: string,
    next: NextFunction
  ) {
    console.log(data, files);
    const rendom_id = generateRandomId();
    const { name, description, uuid, status } = data;
    const image_data = await imageUploader.uploadImage(files, next);
    // const image_data = await add_image.createImage(files, next);
console.log(image_data)
    // // Create vendor data object
    // const updated_data = {
    //   customer_id: `customer_${uuid}_${rendom_id}`,
    //   name: name,
    //   phone,
    //   email,
    //   company_name: company,
    //   gstin,
    //   status,
    //   audit_log: user_id,
    // };

    // // Save the vendor and return the result
    // const customer_data = new Categorie_model(updated_data);
    // return await customer_data.save();
    // await FileManager.deleteFiles(files);
    return;
  }
  async findByName(name: any) {
    const customer = await Categorie_model.find({ name: name });
    return customer;
  }
}
export default CategorieRepository;
