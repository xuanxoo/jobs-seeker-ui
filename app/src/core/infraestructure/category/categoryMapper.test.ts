import { categoryFromResponse, CategoryResponse } from './categoryMapper';

const mockedResponseCategory: CategoryResponse = {
  id: 12,
  attributes: { results: 4440, name: 'IT and telecommunication' },
};

describe('test suit for Category Mapper', () => {
  test('should map CategoryResponse to Category', () => {
    const categoryMapped = categoryFromResponse(mockedResponseCategory);

    expect(categoryMapped.id).toEqual(mockedResponseCategory.id);
    expect(categoryMapped.name).toBe(mockedResponseCategory.attributes.name);
    expect(categoryMapped.results).toBe(mockedResponseCategory.attributes.results);
  });
});
