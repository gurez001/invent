import { NextFunction, Request, Response } from "express";
import AsyncHandler from "../../middlewares/AsyncHandler";
import CategorieService from "../../services/categorieService";
import ErrorHandler from "../../utils/ErrorHandler";
class CategorieController {
  constructor(private categorieService: CategorieService) {}
  add_new_customer = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: string = (req as any).user._id;
      const files = req.files;
      if (!user) {
        return next(new ErrorHandler("User not authenticated", 401));
      }
      const categorie = await this.categorieService.add_new_category(
        req.body,
        files,
        user,
        next
      );
      if (categorie) {
        return res.status(201).json({
          success: true,
        });
      }
    }
  );
  all_categorie = AsyncHandler.handle(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query;

      const resultPerpage = Number(query.rowsPerPage);

      const categorie = await this.categorieService.all_categorie(query);
      const data_counter = await this.categorieService.data_counter(query);
      if (categorie) {
        return res.status(201).json({
          success: true,
          categorie,
          resultPerpage,
          data_counter,
        });
      }
    }
  );
}
export default CategorieController;
