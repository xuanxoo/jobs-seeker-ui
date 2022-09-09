import { Category } from '../../domain/category/Category';

export type CategoryResponse = {
  readonly id: number;
  readonly attributes: {
    results: number;
    name: string;
  };
};

export const categoryFromResponse = (response: CategoryResponse): Category =>
  new Category(response.id, response.attributes.name, response.attributes.results);
