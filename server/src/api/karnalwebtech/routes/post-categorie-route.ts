import { Router } from "express";
import upload from "../../../middlewares/multer";
import CategorieController from "../controllers/post-categorie-controller";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";

const categorieRoutes = (postCategorieConroller: CategorieController) => {
  const router = Router();
  router.post(
    "/add",
    upload.array("images", 10),
    isAuthenticatedUser,  
    authorizeRoles("admin", "employee"),
    postCategorieConroller.create.bind(postCategorieConroller)
  );
  return router;
};
export default categorieRoutes;
