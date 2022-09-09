import { ApiCategoryRepository } from './ApiCategoryRepository';
import { categoryFromResponse, CategoryResponse } from './categoryMapper';

const mockedResponseCategories: CategoryResponse[] = [
  { id: 12, attributes: { results: 4440, name: 'IT and telecommunication' } },
  { id: 13, attributes: { results: 1979, name: 'Finance and accounting' } },
];

const categoryResponseOk: Response = {
  ok: true,
  status: 200,
  json: () => Promise.resolve(mockedResponseCategories),
} as Response;
const categoryResponseError: Response = {
  ok: false,
} as Response;

afterEach(() => {
  jest.clearAllMocks();
});

describe('test suite for ApiCategoryRepository', () => {
  describe('getCatgories', () => {
    it('should return a list of Categories for a 200 response', async () => {
      global.fetch = jest.fn().mockImplementation(() => categoryResponseOk);
      const mockedCategories = mockedResponseCategories.map((responseCategory) =>
        categoryFromResponse(responseCategory)
      );

      const returnedCategoryList = await ApiCategoryRepository.getCategories();

      expect(returnedCategoryList).toStrictEqual(mockedCategories);
    });
    it('should throws error for an unsuccessfull response', async () => {
      global.fetch = jest.fn().mockImplementation(() => categoryResponseError);
      const mockedError = new Error('Error getting categories from api');

      await expect(ApiCategoryRepository.getCategories()).rejects.toThrow(mockedError);
    });
  });
});
