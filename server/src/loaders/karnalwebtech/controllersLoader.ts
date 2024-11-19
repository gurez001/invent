import CategorieController from "../../api/karnalwebtech/controllers/post-categorie-controller";

const controllersLoader = (services: any) => {
  const categorieController = new CategorieController(
    services.categorieService
  );

  return {
    categorieController,
  };
};

export default controllersLoader;
