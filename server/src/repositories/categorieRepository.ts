import { NextFunction } from "express";
import Categorie_model from "../models/categorieModel";
import { generateRandomId } from "../utils/generateRandomId";
import ApiFeatures from "../utils/apiFeatuers";

class CategorieRepository {
  async createCategorie(data: any, image_data: any, user_id: string) {
    const rendom_id = generateRandomId();
    const { name, description, uuid, status } = data;
    const image_ids = image_data.map((item: any) => item._id);
    const updated_data = {
      cat_id: `cat_${uuid}_${rendom_id}`,
      name,
      description,
      status,
      images_id: image_ids,
      audit_log: user_id,
    };
    const Categorie = new Categorie_model(updated_data);
    return await Categorie.save();
  }
  async findByName(name: any) {
    const customer = await Categorie_model.find({ name: name });
    return customer;
  }
  async all_categorie(query: any) {
    const resultPerPage = Number(query.rowsPerPage);
    const apiFeatures = new ApiFeatures(Categorie_model.find(), query);
    apiFeatures.search().filter().sort().pagination(resultPerPage);

    const result = await apiFeatures
      .getQuery() // Use the public getter
      .populate([
        {
          path: "audit_log",
          model: "User",
        },
        {
          path: "images_id",
          model: "Images",
        },
      ])
      .sort({ updated_at: -1 })
      .exec();

    return result;
  }

  async data_counter(query: any) {
    const apiFeatures = new ApiFeatures(Categorie_model.find(), query);
    apiFeatures.search().filter();
    const result = await apiFeatures.exec();
    return result.length;
  }
}
export default CategorieRepository;
