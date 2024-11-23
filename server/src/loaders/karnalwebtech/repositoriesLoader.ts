import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import PostRepository from "../../repositories/karnalwebtech/post-repositories";
import TagRepository from "../../repositories/karnalwebtech/tag-repositories";

const repositoriesLoader = () => {
  const categorieRepository = new CategorieRepository();
  const tagRepository = new TagRepository();
  const postRepository = new PostRepository();
  return {
    categorieRepository,
    tagRepository,
    postRepository,
  };
};
export default repositoriesLoader;
