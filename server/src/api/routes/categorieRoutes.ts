import { Router } from "express";
import CategorieController from "../controllers/categorieController";
import upload from "../../middlewares/multer";
import { isAuthenticatedUser } from "../../middlewares/auth";

const categorieRoutes = (categorieController: CategorieController) => {
  const router = Router();
  router.post(
    "/add",
    upload.array("images", 10),
    isAuthenticatedUser,
    categorieController.add_new_customer.bind(categorieController)
  );
  router.get(
    "/all-categorie",
    isAuthenticatedUser,
    categorieController.all_categorie.bind(categorieController)
  );

  return router;
};
export default categorieRoutes;
