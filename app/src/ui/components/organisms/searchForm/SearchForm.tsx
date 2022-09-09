import React, { KeyboardEvent, useRef, useState } from 'react';
import { Category } from '../../../../core/domain/category';
import { Location } from '../../../../core/domain/location';
import { Button } from '../../atoms/';
import { CategoryDropdown } from '../categoryDropdown';
import { LocationAutocomplete } from '../locationAutocomplete';
import './SearchForm.scss';

const SearchForm: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>();

  const searchBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('location', selectedLocation?.city);
    console.log('categories', selectedCategories);

    if (selectedCategories && selectedCategories.length > 0 && selectedLocation) {
      console.log('form submitted');
    }
  };

  const handleOnSelectedLocation = (location: Location | undefined) => {
    setSelectedLocation(location);
    if (location) searchBtnRef.current?.focus();
  };

  const handleOnSelectedCategories = (categories: Category[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="sf-container">
      <div className="sf-container-jumbotron">
        <div className="sf-container-jumbotron__header">
          <h1>For a better working life</h1>
        </div>
        <form onSubmit={handleOnSubmit} className="sf-container-jumbotron__form">
          <div className="sf-container-jumbotron__form-item">
            <CategoryDropdown onSelectedCategories={handleOnSelectedCategories}></CategoryDropdown>
          </div>
          <div className="sf-container-jumbotron__form-item">
            <LocationAutocomplete onSelectedLocation={handleOnSelectedLocation}></LocationAutocomplete>
          </div>
          <div className="sf-container-jumbotron__form-item sf-container-jumbotron__form-item--centered">
            <Button type="submit" ref={searchBtnRef} dataTestId="btn-submmit">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SearchForm };
