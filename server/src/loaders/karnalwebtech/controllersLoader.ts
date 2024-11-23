import CategorieController from "../../api/karnalwebtech/controllers/post-categorie-controller";
import TagController from "../../api/karnalwebtech/controllers/tag-controller";

const controllersLoader = (services: any) => {
  const categorieController = new CategorieController(
    services.categorieService
  );
  const tagController = new TagController(services.tagService);

  return {
    categorieController,
    tagController,
  };
};

export default controllersLoader;
