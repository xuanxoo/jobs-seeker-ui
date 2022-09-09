import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryApplication } from '../../../../core/application/category';
import { Category } from '../../../../core/domain/category/Category';
import { Input } from '../../atoms';
import { CategoryList } from '../categoryList';
import './CategoryDropdown.scss';

type CategoryDropdownProps = {
  readonly onSelectedCategories?: (category: Category[]) => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onSelectedCategories }: CategoryDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const inputStyle = { borderRight: 0 } as React.CSSProperties;
  const topCategoryElements: number = 8;

  const topCategories = useMemo(() => categories.slice(0, topCategoryElements), [categories, topCategoryElements]);
  const moreCategories = useMemo(() => categories.slice(topCategoryElements + 1), [categories, topCategoryElements]);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleSelectedCategory = (category: Category, selected: boolean) => {
    let newSelection;
    if (selected) {
      newSelection = [...selectedCategories, category];
    } else {
      newSelection = selectedCategories.filter((catgoery) => catgoery.id !== category.id);
    }
    setSelectedCategories(newSelection);
    onSelectedCategories && onSelectedCategories(newSelection);
  };

  const loadCategories = useCallback(async () => {
    try {
      const categories = await CategoryApplication.getCategories();
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <div className="cdd-container">
      <div tabIndex={0} className="cdd-header">
        <div className="cdd-header__keyword" data-testid="cdd-input">
          <Input placeHolder="Enter keyword" style={inputStyle}></Input>
        </div>
        <div
          className="cdd-header__select"
          role="button"
          onKeyPress={() => toggleDropdown()}
          onClick={() => toggleDropdown()}
          data-testid="cdd-button"
        >
          <div className="cdd-header__select-container">
            <button type="button">in all categories</button>
            <i className="arrow-down"></i>
          </div>
        </div>
      </div>
      {openDropdown && (
        <div className="cdd-list" data-testid="cdd-list">
          <CategoryList
            title="Top categories"
            categories={topCategories}
            selectedCategories={selectedCategories}
            data-testid="cdd-list-top"
            onCategorySelected={handleSelectedCategory}
          ></CategoryList>
          <CategoryList
            title="More categories"
            visibleRows={3}
            categories={moreCategories}
            selectedCategories={selectedCategories}
            onCategorySelected={handleSelectedCategory}
            data-testid="cdd-list-more"
          ></CategoryList>
        </div>
      )}
    </div>
  );
};

export { CategoryDropdown };
