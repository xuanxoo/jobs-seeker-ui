import { Category, CategoryRepository } from '../../domain/category';

const GetCategories = (categoryRespository: CategoryRepository) => async (): Promise<Category[]> => {
  const categories = await categoryRespository.getCategories();
  return [...categories].sort((cat1, cat2) => cat2.results - cat1.results);
};

export { GetCategories };
