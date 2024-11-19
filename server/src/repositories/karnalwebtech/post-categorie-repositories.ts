import PostCategorieModel from "../../models/karnalwebtech/post-categorie";
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
}

export default CategorieRepository;
