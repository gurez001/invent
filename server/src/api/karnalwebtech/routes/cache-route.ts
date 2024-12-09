import { Router } from "express";
import CacheManager from "../../../utils/comman-repositories/removeCaches";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";
const router = Router();
const cacheManager = new CacheManager();

// Route to remove cache
router.post("/remove-cache", (req, res, next) => {
  cacheManager.removeCache(req, res, next);
});

export default router;
