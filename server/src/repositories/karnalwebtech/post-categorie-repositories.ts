import PostCategorieModel from "../../models/karnalwebtech/post-categorie";
import User from "../../models/primary/userModel";
import ApiFeatures from "../../utils/apiFeatuers";
import { generateRandomId } from "../../utils/generateRandomId";

class CategorieRepository {
  // Reusable function to generate unique category ID
  private generateCategoryId(uuid: string, randomId: string): string {
    return `cat_${uuid}_${randomId}`;
  }

  // Reusable function to get the next category number
  private async getNextCategoryNumber(): Promise<number> {
    const count = await PostCategorieModel.countDocuments();
    return count + 1;
  }

  async create(data: any, image_data: any, seo: any, user_id: string) {
    try {
      const randomId = generateRandomId();
      const { title, content, uuid, status, metaCanonicalUrl } = data;
      const imageIds = image_data.map((item: any) => item._id);

      // Get next category number (optimized)
      const categoryNumber = await this.getNextCategoryNumber();

      // Prepare data to be saved
      const updatedData = {
        _no: categoryNumber,
        cat_id: this.generateCategoryId(uuid, randomId),
        title,
        content,
        status: status,
        slug: metaCanonicalUrl,
        feature_image: imageIds[0],
        seo: seo?._id,
        post_id: `${uuid}${categoryNumber}`,
        audit_log: user_id,
      };

      // Create and save new category
      const newCategory = new PostCategorieModel(updatedData);
      return await newCategory.save();
    } catch (error: any) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }
  async findByUrl(url: string) {
    const newCategory = await PostCategorieModel.findOne({ slug: url });
    return newCategory;
  }
  async all(query: any) {
    const resultPerPage = Number(query.rowsPerPage);
    const apiFeatures = new ApiFeatures(PostCategorieModel.find(), query);
    apiFeatures.search().filter().sort().pagination(resultPerPage);

    const result = await apiFeatures
      .getQuery() // Use the public getter
      .populate([
        {
          path: "audit_log",
          model: User,
        },
        {
          path: "feature_image",
          model: "Karnal_Images",
        },
        {
          path: "seo",
          model: "Karnal_web_seo",
        },
      ])
      .sort({ updated_at: -1 })
      .exec();

    return result;
  }

  async data_counter(query: any) {
    const apiFeatures = new ApiFeatures(PostCategorieModel.find(), query);
    apiFeatures.search().filter();
    const result = await apiFeatures.exec();
    return result.length;
  }
}

export default CategorieRepository;
