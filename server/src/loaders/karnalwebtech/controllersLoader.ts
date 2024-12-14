import ContactUsController from "../../api/karnalwebtech/controllers/contact-us-controller";
import PortfolioController from "../../api/karnalwebtech/controllers/portfolio-controller";
import CategorieController from "../../api/karnalwebtech/controllers/post-categorie-controller";
import PostController from "../../api/karnalwebtech/controllers/post-controller";
import TagController from "../../api/karnalwebtech/controllers/tag-controller";

const controllersLoader = (services: any) => {
  const categorieController = new CategorieController(
    services.categorieService
  );
  const tagController = new TagController(services.tagService);
  const postController = new PostController(services.postService);
  const contactUsController = new ContactUsController(
    services.contactUsService
  );
  const portfolioController = new PortfolioController(
    services.portfoliotService
  );

  return {
    categorieController,
    tagController,
    postController,
    portfolioController,
    contactUsController,
  };
};

export default controllersLoader;
