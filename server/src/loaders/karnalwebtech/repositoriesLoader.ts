import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import TagRepository from "../../repositories/karnalwebtech/tag-repositories";

const repositoriesLoader = () => {
  const categorieRepository = new CategorieRepository();
  const tagRepository = new TagRepository();
  return {
    categorieRepository,
    tagRepository,
  };
};
export default repositoriesLoader;
