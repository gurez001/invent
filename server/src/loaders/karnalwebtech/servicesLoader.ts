import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import CategorieService from "../../services/karnalwebtech/post-caregorie-service";

const servicesLoader = (repositories: {
  categorieRepository: CategorieRepository;
}) => {
  const categorieService = new CategorieService(
    repositories.categorieRepository
  );

  return {
    categorieService,
  };
};

export default servicesLoader;
