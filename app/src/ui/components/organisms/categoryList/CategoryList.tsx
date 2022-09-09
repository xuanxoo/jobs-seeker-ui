import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Category } from '../../../../core/domain/category/Category';
import { Checkbox } from '../../atoms';
import './CategoryList.scss';

type CategoryListProps = {
  readonly title: string;
  readonly visibleRows?: number;
  readonly categories: Category[];
  readonly selectedCategories?: Category[];
  readonly onCategorySelected?: (category: Category, selected: boolean) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({
  title,
  visibleRows,
  categories,
  selectedCategories,
  onCategorySelected,
}: CategoryListProps) => {
  const [height, setHeight] = useState(0);
  const [heightList, setHeightList] = useState<number[]>([]);

  const isCategorySelected = (category: Category) => {
    return selectedCategories && selectedCategories.some((cat) => cat.id === category.id);
  };

  const handleSelectedCategory = (category: Category, selected: boolean) => {
    onCategorySelected && onCategorySelected(category, selected);
  };

  const handleRefRect = useCallback((element: HTMLDivElement) => {
    const itemHeight = element?.getBoundingClientRect().height;
    setHeightList((state) => [...state, itemHeight]);
  }, []);

  useLayoutEffect(() => {
    const getContainerHeight = () => {
      //filter just odd elements because of two items per row
      const rowsHeightList = heightList.filter((_height, idx) => !(idx % 2));
      const visibleCategoryRows = visibleRows ? visibleRows : rowsHeightList.length;

      return rowsHeightList.slice(0, visibleCategoryRows).reduce((acc: number, height: number) => acc + height, 0);
    };

    setHeight(getContainerHeight());
  }, [heightList, visibleRows]);

  return (
    <div className="cl-container">
      <div className="cl-header">
        <div className="cl-header__title--bold">{title}</div>
      </div>
      <div className="cl-content">
        <div className="cl-content__list" style={{ height }} data-testid="category-list">
          {categories.map((category) => {
            return (
              <div
                className="cl-content__item"
                key={category.id}
                ref={handleRefRect}
                data-testid={`category-item-${category.id}`}
              >
                <Checkbox
                  name={`${category.name} (${category.results})`}
                  dataTestId={`category-chk-${category.id}`}
                  value={`category-chk-${category.id}`}
                  checked={isCategorySelected(category)}
                  onCheck={(selected) => handleSelectedCategory(category, selected)}
                ></Checkbox>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { CategoryList };
