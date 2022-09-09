import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

const mockOnClick = jest.fn();

type RenderButtonProps = {
  readonly color?: 'primary' | 'secondary';
};
const renderComponent = ({ color = 'primary' }: RenderButtonProps = {}) =>
  render(
    <Button color={color} onClick={mockOnClick}>
      Test
    </Button>
  );

describe('test suite for Button', () => {
  it('should calls onClick when clicking the button', () => {
    renderComponent();

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(mockOnClick).toHaveBeenCalled();
  });
  it('should render the primary button color', () => {
    renderComponent();

    const btn = screen.getByRole('button');

    expect(btn.classList.contains('btn-container__btn--primary')).toBeTruthy();
  });
  it('should render the secondary button color', () => {
    renderComponent({ color: 'secondary' });

    const btn = screen.getByRole('button');

    expect(btn.classList.contains('btn-container__btn--secondary')).toBeTruthy();
  });
});
