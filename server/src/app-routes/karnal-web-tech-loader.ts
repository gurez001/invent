import tagRoutes from "../api/karnalwebtech/routes/tag-route";
import categorieRoutes from "../api/karnalwebtech/routes/tag-route";

const karnalwebteh_routesLoader = (app: any, controllers: any) => {
  app.use("/api/v2/categorie", categorieRoutes(controllers.categorieController));
  app.use("/api/v2/tag", tagRoutes(controllers.tagController));
};

export default karnalwebteh_routesLoader;