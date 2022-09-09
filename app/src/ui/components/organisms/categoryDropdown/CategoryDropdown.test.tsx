import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Category } from '../../../../core/domain/category/Category';
import { CategoryDropdown } from './CategoryDropdown';

const mockedCategories: Category[] = [
  { id: 1, results: 4440, name: 'IT and telecommunication' },
  { id: 2, results: 1979, name: 'Finance and accounting' },
  { id: 3, results: 2130, name: 'Health, medical and social' },
  { id: 4, results: 3262, name: 'Sales and commerce' },
  { id: 5, results: 2586, name: 'Production, construction and trade' },
  { id: 6, results: 1982, name: 'Management / executive and strategic management' },
  { id: 7, results: 1468, name: 'Not categorized' },
  { id: 8, results: 2652, name: 'Engineering / technical' },
];

const renderComponent = () => render(<CategoryDropdown></CategoryDropdown>);

describe('test suite for CategoryDropdown', () => {
  it('should show the category list', async () => {
    renderComponent();

    const categoryDropdownButton = screen.getByTestId('cdd-button');
    userEvent.click(categoryDropdownButton);
    const categoryDropdownList = screen.getByTestId('cdd-list');

    await waitFor(() => {
      expect(categoryDropdownList).toBeVisible();
    });
  });
  it('should hide the category list', async () => {
    renderComponent();

    const categoryDropdownButton = screen.getByTestId('cdd-button');
    userEvent.click(categoryDropdownButton);
    const categoryDropdownList = screen.getByTestId('cdd-list');
    userEvent.click(categoryDropdownButton);

    await waitFor(() => {
      expect(categoryDropdownList).not.toBeVisible();
    });
  });
});
