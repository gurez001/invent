import ContactUsRepository from "../../repositories/karnalwebtech/contact-us-repositories";
import PortfoliotRepository from "../../repositories/karnalwebtech/portfolio-repositories";
import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import PostRepository from "../../repositories/karnalwebtech/post-repositories";
import TagRepository from "../../repositories/karnalwebtech/tag-repositories";
import ContactUsService from "../../services/karnalwebtech/contact-us-service";
import PortfoliotService from "../../services/karnalwebtech/portfolio-service";
import CategorieService from "../../services/karnalwebtech/post-caregorie-service";
import PostService from "../../services/karnalwebtech/post-service";
import TagService from "../../services/karnalwebtech/tag-service";

const servicesLoader = (repositories: {
  categorieRepository: CategorieRepository;
  tagRepository: TagRepository;
  postRepository: PostRepository;
  portfoliotRepository: PortfoliotRepository;
  contactUsRepository: ContactUsRepository;
}) => {
  const categorieService = new CategorieService(
    repositories.categorieRepository
  );
  const tagService = new TagService(repositories.tagRepository);
  const postService = new PostService(repositories.postRepository);
  const portfoliotService = new PortfoliotService(
    repositories.portfoliotRepository
  );
  const contactUsService = new ContactUsService(
    repositories.contactUsRepository
  );

  return {
    categorieService,
    tagService,
    postService,
    portfoliotService,
    contactUsService,
  };
};

export default servicesLoader;
