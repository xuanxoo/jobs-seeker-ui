import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

const mockOnCheck = jest.fn();

type RenderCheckboxProps = {
  readonly checked?: boolean;
};
const renderComponent = ({ checked = false }: RenderCheckboxProps = {}) =>
  render(
    <Checkbox
      name="Checkbox test"
      dataTestId="container-chk"
      checked={checked}
      value="chk-1"
      onCheck={mockOnCheck}
    ></Checkbox>
  );

describe('test suite for Checkbox', () => {
  it('should check the input when clicking', async () => {
    renderComponent();

    const checkboxInput = screen.getByTestId('container-chk');
    fireEvent.click(checkboxInput);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toEqual(true);
  });
  it('should uncheck the input when clicking', async () => {
    renderComponent({ checked: true });

    const checkboxInput = screen.getByTestId('container-chk');
    fireEvent.click(checkboxInput);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toEqual(false);
  });
  it('should calls onCheck when clicking the checkbox', () => {
    renderComponent();

    const checkboxInput = screen.getByTestId('container-chk');
    fireEvent.click(checkboxInput);

    expect(mockOnCheck).toHaveBeenCalled();
  });
});
