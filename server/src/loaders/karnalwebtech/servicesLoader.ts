import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import TagRepository from "../../repositories/karnalwebtech/tag-repositories";
import CategorieService from "../../services/karnalwebtech/post-caregorie-service";
import TagService from "../../services/karnalwebtech/tag-service";

const servicesLoader = (repositories: {
  categorieRepository: CategorieRepository;
  tagRepository: TagRepository;
}) => {
  const categorieService = new CategorieService(
    repositories.categorieRepository
  );
  const tagService = new TagService(
    repositories.tagRepository
  );

  return {
    categorieService,tagService
  };
};

export default servicesLoader;
