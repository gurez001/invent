import ContactUsRepository from "../../repositories/karnalwebtech/contact-us-repositories";
import PortfoliotRepository from "../../repositories/karnalwebtech/portfolio-repositories";
import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import PostRepository from "../../repositories/karnalwebtech/post-repositories";
import TagRepository from "../../repositories/karnalwebtech/tag-repositories";

const repositoriesLoader = () => {
  const categorieRepository = new CategorieRepository();
  const tagRepository = new TagRepository();
  const postRepository = new PostRepository();
  const portfoliotRepository = new PortfoliotRepository();
  const contactUsRepository = new ContactUsRepository();
  return {
    categorieRepository,
    tagRepository,
    postRepository,
    portfoliotRepository,contactUsRepository
  };
};
export default repositoriesLoader;
