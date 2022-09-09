import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Category } from '../../../../core/domain/category/Category';
import { CategoryList } from './CategoryList';

const mockOnCategorySelected = jest.fn();

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

type RenderCategoryListProps = {
  readonly visibleRows?: number;
  readonly selectedCategories?: Category[];
};

const renderComponent = ({ visibleRows, selectedCategories }: RenderCategoryListProps = {}) =>
  render(
    <CategoryList
      title="Category List"
      visibleRows={visibleRows}
      categories={mockedCategories}
      selectedCategories={selectedCategories}
      onCategorySelected={mockOnCategorySelected}
    ></CategoryList>
  );

describe('test suite for CategoryList', () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        x: 0,
        y: 0,
        bottom: 0,
        height: 10,
        left: 0,
        right: 10,
        top: 0,
        width: 100,
        toJSON: () => {},
      };
    });
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should show all categories visible', () => {
    renderComponent();
    const category1Item = screen.getByTestId('category-item-1');
    const category2Item = screen.getByTestId('category-item-2');
    const category3Item = screen.getByTestId('category-item-3');

    expect(category1Item).toBeVisible();
    expect(category2Item).toBeVisible();
    expect(category3Item).toBeVisible();
  });
  it('should render the category container to show only the first row', async () => {
    renderComponent({ visibleRows: 1 });

    const categoryListContainer = screen.getByTestId('category-list');
    const category1Item = screen.getByTestId('category-item-1');
    const category2Item = screen.getByTestId('category-item-2');
    const category3Item = screen.getByTestId('category-item-3');

    expect(category1Item).toBeInTheDocument();
    expect(category2Item).toBeInTheDocument();
    expect(category3Item).toBeInTheDocument();
    expect(categoryListContainer).toHaveStyle('height: 10px');
  });
  it('should render the category container to show only the first and second row', async () => {
    renderComponent({ visibleRows: 2 });

    const categoryListContainer = screen.getByTestId('category-list');
    const category1Item = screen.getByTestId('category-item-1');
    const category2Item = screen.getByTestId('category-item-2');
    const category3Item = screen.getByTestId('category-item-3');

    expect(category1Item).toBeInTheDocument();
    expect(category2Item).toBeInTheDocument();
    expect(category3Item).toBeInTheDocument();
    expect(categoryListContainer).toHaveStyle('height: 20px');
  });
  it('should mark as checked the selected categories', async () => {
    const mockedSelectedCategories: Category[] = [
      { id: 1, results: 4440, name: 'IT and telecommunication' },
      { id: 2, results: 1979, name: 'Finance and accounting' },
    ];
    renderComponent({ selectedCategories: mockedSelectedCategories });

    const category1ItemChk = screen.getByTestId('category-chk-1');
    const category1ItemChkInput = within(category1ItemChk).getByRole('checkbox') as HTMLInputElement;

    const category2ItemChk = screen.getByTestId('category-chk-2');
    const category2ItemChkInput = within(category2ItemChk).getByRole('checkbox') as HTMLInputElement;

    const category3ItemChk = screen.getByTestId('category-chk-3');
    const category3ItemChkInput = within(category3ItemChk).getByRole('checkbox') as HTMLInputElement;

    expect(category1ItemChkInput).toBeChecked();
    expect(category2ItemChkInput).toBeChecked();
    expect(category3ItemChkInput).not.toBeChecked();
  });
  it('should call handleSelectedCategory when selecting a category', () => {
    renderComponent();

    const category1ItemChk = screen.getByTestId('category-chk-1');
    userEvent.click(category1ItemChk);

    expect(mockOnCategorySelected).toHaveBeenCalled();
  });
});
