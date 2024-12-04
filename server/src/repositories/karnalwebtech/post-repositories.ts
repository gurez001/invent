import { NextFunction } from "express";
import User from "../../models/primary/userModel";
import ApiFeatures from "../../utils/apiFeatuers";
import ErrorHandler from "../../utils/ErrorHandler";
import { generateRandomId } from "../../utils/generateRandomId";
import PostModel from "../../models/karnalwebtech/post-model";
import { getImageModel } from "../../utils/models-handler/image-model-handler";

class PostRepository {
  // Reusable function to generate unique post ID
  private generatePostId(
    uuid: string,
    randomId: string,
    number: number
  ): string {
    return `post_${randomId.toLowerCase()}_${uuid}${number}`;
  }

  // Reusable function to get the next post number
  private async getNextPostNumber(): Promise<number> {
    const count = await PostModel.countDocuments();
    return count + 1;
  }

  // Helper function for populating category data
  private async populatePostData(query: any) {
    return query.populate([
      { path: "audit_log", model: User },
      { path: "feature_image", model: "Karnal_Images" },
      { path: "categorie", model: "Karnal_categorie" },
      { path: "tag", model: "Karnal_tag" },
      { path: "seo", model: "Karnal_web_seo" },
    ]);
  }

  // Create a new post
  async create(data: any, image_data: any, seo: any, user_id: string) {
    try {
      const randomId = generateRandomId();
      const {
        title,
        content,
        description,
        uuid,
        categorie,
        tags,
        status,
        metaCanonicalUrl,
      } = data;
      const imageIds = image_data.map((item: any) => item._id);

      // Get next post number
      const postNumber = await this.getNextPostNumber();

      // Generate post ID
      const catId = this.generatePostId(uuid, randomId, postNumber);

      // Prepare data to be saved
      const newPostData = {
        _no: postNumber,
        title,
        content,
        status,
        description,
        categorie: categorie
          ? categorie.split(",")
          : ["6741bd2663fa4c1a8dd7548b"], // Default categorie ID
        tag: tags ? tags.split(",") : ["6741bd9d63fa4c1a8dd7549f"], // Default tag ID
        slug: metaCanonicalUrl,
        feature_image: imageIds[0],
        seo: seo?._id,
        post_id: catId,
        audit_log: user_id,
      };

      // Create and save the new post
      const post = new PostModel(newPostData);
      const savedPost: any = await post.save(); // Save the post first to get the post with populated fields

      // Now populate the categories after the post is saved
      await savedPost.populate("Karnal_categorie");
      // Prepare image update promises for updating the displayed path and activating the image
      const imageUpdatePromises = imageIds.map((id: any) =>
        getImageModel("karnalwebtech")
          .findByIdAndUpdate(
            id,
            {
              displayedpath: `${savedPost?.categorie[0]?.slug}/${newPostData.slug}`, // Use the populated category slug
              is_active: true, // Mark the image as active
            },
            { new: true } // Return the updated document
          )
          .catch((error) => {
            // Log any error that occurs during the update of each image
            console.error(
              `Error updating image with ID ${id}: ${error.message}`
            );
            throw new Error(`Error updating image with ID ${id}`);
          })
      );

      // Wait for all image updates to finish
      await Promise.all(imageUpdatePromises);
      return await savedPost;
    } catch (error: any) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  // Find post by URL
  async findByUrl(url: string) {
    return await PostModel.findOne({ slug: url });
  }

  // Retrieve all post with filters and pagination
  async all(query: any) {
    const resultPerPage = Number(query.rowsPerPage);
    const apiFeatures = new ApiFeatures(
      PostModel.find({ is_delete: { $ne: true } }),
      query
    );
    apiFeatures.search().filter().sort().pagination(resultPerPage);

    // Apply population and execute query
    const result = await apiFeatures
      .getQuery()
      .populate([
        { path: "audit_log", model: User },
        { path: "feature_image", model: "Karnal_Images" },
        { path: "categorie", model: "Karnal_categorie" },
        { path: "tag", model: "Karnal_tag" },
        { path: "seo", model: "Karnal_web_seo" },
      ])
      .sort({ updated_at: -1 })
      .exec();

    return result;
  }

  // Get the total count of [pst] based on filters
  async data_counter(query: any) {
    const apiFeatures = new ApiFeatures(
      PostModel.find({ is_delete: { $ne: true } }),
      query
    );
    apiFeatures.search().filter();
    const result = await apiFeatures.exec();
    return result.length;
  }

  // Find post by ID
  async find_by_id(id: string, next: NextFunction) {
    const result = await this.populatePostData(PostModel.findById(id));
    if (!result) {
      return next(new ErrorHandler(`Post with ID ${id} not found`, 404));
    }
    return result;
  }

  // Update a post
  async update(data: any, image_data: any, user_id: string) {
    const {
      title,
      content,
      description,
      categorie,
      tags,
      status,
      metaCanonicalUrl,
    } = data;
    const image_ids = image_data?.length
      ? image_data.map((item: any) => item._id)
      : data?.images;

    const updated_data: any = {
      title,
      content,
      description,
      categorie: categorie
        ? categorie.split(",")
        : ["6741bd2663fa4c1a8dd7548b"], // Default categorie ID
      tag: tags ? tags.split(",") : ["6741bd9d63fa4c1a8dd7549f"], // Default tag ID
      status: status === "" ? "published" : status,
      slug: metaCanonicalUrl,
      feature_image: image_ids?.length ? image_ids : undefined,
      audit_log: user_id,
    };

    const updated_post = await PostModel.findOneAndUpdate(
      { post_id: data.id },
      updated_data,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!updated_post) {
      throw new Error("Post not found");
    }

    return updated_post;
  }

  // Find post by URL and exclude certain ID
  async findBYUrl(url: string, excludeId: string) {
    const query: any = { slug: url };
    if (excludeId) query._id = { $ne: excludeId }; // Exclude specified ID
    return await PostModel.findOne(query);
  }

  // Find post by page ID
  async findBYpageid(id: string, next: NextFunction) {
    const result = await this.populatePostData(
      PostModel.findOne({ post_id: id })
    );

    if (!result) {
      return next(new ErrorHandler(`Post with ID ${id} not found`, 404));
    }

    return result;
  }
  // Find post by page ID
  async findBYSlug(id: string, next: NextFunction) {
    const result = await this.populatePostData(PostModel.findOne({ slug: id }));

    if (!result) {
      return next(new ErrorHandler(`Post with ID ${id} not found`, 404));
    }

    return result;
  }
  async removeItem(id: string, next: NextFunction) {
    const result = await this.populatePostData(
      PostModel.findOne({ post_id: id })
    );

    if (!result) {
      return next(new ErrorHandler(`Post with ID ${id} not found`, 404));
    }
    result.is_delete = true;
    await result.save();
    return result;
  }
}

export default PostRepository;
