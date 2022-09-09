import { Category } from './Category';

const mockedCategory: Category = { id: 1, results: 4440, name: 'IT and telecommunication' };

describe('test suite for Category', () => {
  it('should create a new Category object', () => {
    const newCategory = new Category(mockedCategory.id, mockedCategory.name, mockedCategory.results);

    expect(newCategory).toStrictEqual(newCategory);
  });
});
