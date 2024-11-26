import { NextFunction } from "express";
import PostCategorieModel from "../../models/karnalwebtech/post-categorie";
import User from "../../models/primary/userModel";
import ApiFeatures from "../../utils/apiFeatuers";
import ErrorHandler from "../../utils/ErrorHandler";
import { generateRandomId } from "../../utils/generateRandomId";

class CategorieRepository {
  // Reusable function to generate unique category ID
  private generateCategoryId(
    uuid: string,
    randomId: string,
    categoryNumber: number
  ): string {
    return `cate_${randomId.toLowerCase()}_${uuid}${categoryNumber}`;
  }

  // Reusable function to get the next category number
  private async getNextCategoryNumber(): Promise<number> {
    const count = await PostCategorieModel.countDocuments();
    return count + 1;
  }

  // Helper function for populating category data
  private async populateCategoryData(query: any) {
    return query.populate([
      { path: "audit_log", model: User },
      { path: "feature_image", model: "Karnal_Images" },
      { path: "seo", model: "Karnal_web_seo" },
    ]);
  }

  // Create a new category
  async create(data: any, image_data: any, seo: any, user_id: string) {
    try {
      const randomId = generateRandomId();
      const { title, content,description, uuid,type, status, metaCanonicalUrl } = data;
      const imageIds = image_data.map((item: any) => item._id);

      // Get next category number
      const categoryNumber = await this.getNextCategoryNumber();

      // Generate category ID
      const catId = this.generateCategoryId(uuid, randomId, categoryNumber);

      // Prepare data to be saved
      const newCategoryData = {
        _no: categoryNumber,
        title,description,
        content,
        status,
        type:type,
        slug: metaCanonicalUrl,
        feature_image: imageIds[0],
        seo: seo?._id,
        cat_id: catId,
        audit_log: user_id,
      };

      // Create and save the new category
      const newCategory = new PostCategorieModel(newCategoryData);
      return await newCategory.save();
    } catch (error: any) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  // Find category by URL
  async findByUrl(url: string) {
    return await PostCategorieModel.findOne({ slug: url });
  }

  // Retrieve all categories with filters and pagination
  async all(query: any) {
    const resultPerPage = Number(query.rowsPerPage);
    const apiFeatures = new ApiFeatures(PostCategorieModel.find({is_delete: { $ne: true } }), query);
    apiFeatures.search().filter().sort().pagination(resultPerPage);

    // Apply population and execute query
    const result = await apiFeatures
      .getQuery()
      .populate([
        { path: "audit_log", model: User },
        { path: "feature_image", model: "Karnal_Images" },
        { path: "seo", model: "Karnal_web_seo" },
      ])
      .sort({ updated_at: -1 })
      .exec();

    return result;
  }

  // Get the total count of categories based on filters
  async data_counter(query: any) {
    const apiFeatures = new ApiFeatures(PostCategorieModel.find({is_delete: { $ne: true } }), query);
    apiFeatures.search().filter();
    const result = await apiFeatures.exec();
    return result.length;
  }

  // Find category by ID
  async find_by_id(id: string, next: NextFunction) {
    const category = await this.populateCategoryData(
      PostCategorieModel.findById(id)
    );

    if (!category) {
      return next(new ErrorHandler(`Category with ID ${id} not found`, 404));
    }

    return category;
  }

  // Update a category
  async update(data: any, image_data: any, user_id: string) {
    const { title, content, status,description, metaCanonicalUrl } = data;
    const image_ids = image_data?.length
      ? image_data.map((item: any) => item._id)
      : data?.images;

    const updated_data = {
      title,
      content,description,
      status: status === "" ? "published" : status,
      slug: metaCanonicalUrl,
      feature_image: image_ids?.length ? image_ids : undefined,
      audit_log: user_id,
    };
    const updated_category = await PostCategorieModel.findOneAndUpdate(
      { cat_id: data.id },
      updated_data,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!updated_category) {
      throw new Error("Category not found");
    }

    return updated_category;
  }

  // Find category by URL and exclude certain ID
  async findBYUrl(url: string, excludeId: string) {
    const query: any = { slug: url };
    if (excludeId) query._id = { $ne: excludeId }; // Exclude specified ID
    return await PostCategorieModel.findOne(query);
  }

  // Find category by page ID
  async findBYpageid(id: string, next: NextFunction) {
    const category = await this.populateCategoryData(
      PostCategorieModel.findOne({ cat_id: id })
    );

    if (!category) {
      return next(new ErrorHandler(`Category with ID ${id} not found`, 404));
    }

    return category;
  }
  async removeItem(id: string, next: NextFunction) {
    const category = await this.populateCategoryData(
      PostCategorieModel.findOne({ cat_id: id })
    );

    if (!category) {
      return next(new ErrorHandler(`Category with ID ${id} not found`, 404));
    }
    category.is_delete = true;
    await category.save();
    return category;
  }
}

export default CategorieRepository;
