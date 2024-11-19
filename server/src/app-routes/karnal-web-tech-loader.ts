import categorieRoutes from "../api/karnalwebtech/routes/post-categorie-route";

const karnalwebteh_routesLoader = (app: any, controllers: any) => {
  app.use("/api/v2/categorie", categorieRoutes(controllers.categorieController));
};

export default karnalwebteh_routesLoader;