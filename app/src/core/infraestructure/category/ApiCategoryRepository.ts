import { Category } from '../../domain/category/Category';
import { CategoryRepository } from '../../domain/category/CategoryRepository';
import FetchHttpClient from '../../shared/FetchHttpClient';
import { categoryFromResponse, CategoryResponse } from './categoryMapper';

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await FetchHttpClient.get(`/categories`);

    if (!response.ok) {
      throw new Error('Error getting categories from api');
    }

    const result = await response.json();
    return result.map((category: CategoryResponse) => categoryFromResponse(category));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ApiCategoryRepository: CategoryRepository = {
  getCategories,
};
