import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Input } from './Input';

const mockOnChange = jest.fn();

const renderComponent = () => render(<Input placeHolder="test" value="test" onChange={mockOnChange}></Input>);

describe('test suite for Input', () => {
  it('should calls onChange event when writing on the input', async () => {
    renderComponent();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'testing...' } });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
