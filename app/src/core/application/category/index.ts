import { ApiCategoryRepository } from '../../infraestructure/category/ApiCategoryRepository';
import { GetCategories } from './GetCategories';

const CategoryApplication = {
  getCategories: GetCategories(ApiCategoryRepository),
};

export { CategoryApplication };
