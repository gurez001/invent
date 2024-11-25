import { Router } from "express";
import ImageController from "../controllers/image-controller";

const imageRoutes = (imageController: ImageController) => {
  const router = Router();
  router.get(
    "/",
    // isAuthenticatedUser,
    // authorizeRoles("admin", "employee"),
    imageController.all.bind(imageController)
  );
  return router;
};
export default imageRoutes;
