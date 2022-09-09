import { Category, CategoryRepository } from '../../domain/category';
import { GetCategories } from './GetCategories';

const mockedCategories: Category[] = [
  { id: 1, results: 4440, name: 'IT and telecommunication' },
  { id: 2, results: 1979, name: 'Finance and accounting' },
  { id: 15, results: 2130, name: 'Health, medical and social' },
];

const mockedCategoryRepository: CategoryRepository = {
  getCategories: async () => mockedCategories,
};

describe('test suite for GetCategories usecase', () => {
  it('should return the expected Category list', async () => {
    const categoriesPromise = await GetCategories(mockedCategoryRepository);
    const categories = await categoriesPromise();

    expect(categories.length).toEqual(3);
  });
  it('should return a category list ordered by results', async () => {
    const categoriesPromise = await GetCategories(mockedCategoryRepository);
    const categories = await categoriesPromise();

    expect(categories[1].id).toEqual(15);
  });
});
