import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';

const renderComponent = () => render(<SearchForm></SearchForm>);

describe('test suite for SearchForm', () => {
  it('should show the title and subtitle', async () => {
    renderComponent();

    const titleH1 = screen.getByRole('heading', { level: 1 });
    const titleH2 = screen.getByRole('heading', { level: 2 });

    expect(titleH1.textContent).toBe('For a better working life');
    expect(titleH2.textContent).toBe('The new XING jobs');
  });
});
