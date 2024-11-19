import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";

const repositoriesLoader = () => {
  const categorieRepository = new CategorieRepository();
  return {
    categorieRepository,
  };
};
export default repositoriesLoader;
