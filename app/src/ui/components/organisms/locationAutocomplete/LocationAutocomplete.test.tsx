import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationAutocomplete } from './LocationAutocomplete';

const renderComponent = () => render(<LocationAutocomplete></LocationAutocomplete>);

describe('test suite for LocationAutocomplete', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should show location suggestions when input change to a keyword major than 2 chars', async () => {
    renderComponent();

    const locationInput = screen.getByTestId('location-input');
    fireEvent.change(locationInput, { target: { value: 'Ber' } });

    await waitFor(() => {
      const locationList = screen.queryByTestId('location-list');
      expect(locationList).toBeVisible();
    });
  });
  it('should not show location suggestions when the keyword is minor than 3 chars', async () => {
    renderComponent();

    const locationInput = screen.getByTestId('location-input');

    fireEvent.change(locationInput, { target: { value: 'Be' } });
    await waitFor(() => {
      const locationList = screen.queryByTestId('location-list');
      expect(locationList).not.toBeInTheDocument();
    });
  });
  it('should select the city when clicking a city option in the list', async () => {
    renderComponent();

    const locationInput = screen.getByTestId('location-input') as HTMLInputElement;
    fireEvent.change(locationInput, { target: { value: 'Ber' } });

    const locationList = await screen.findByTestId('location-list');
    const firstCityOption = within(locationList).getByText('Bergen, NI, Germany');

    userEvent.click(firstCityOption);
    expect(locationInput.value).toBe('Bergen, NI, Germany');
  });
  it('should show location suggestions after select a city and change the input', async () => {
    renderComponent();

    const locationInput = screen.getByTestId('location-input') as HTMLInputElement;
    fireEvent.change(locationInput, { target: { value: 'Ber' } });

    const locationList = await screen.findByTestId('location-list');
    const firstCityOption = screen.getByText('Bergen, NI, Germany');

    userEvent.click(firstCityOption);
    expect(locationList).not.toBeInTheDocument();

    fireEvent.change(locationInput, { target: { value: '' } });
    await waitFor(() => {
      const locationList = screen.queryByTestId('location-list');
      expect(locationList).not.toBeInTheDocument();
    });

    fireEvent.change(locationInput, { target: { value: 'Ber' } });
    await waitFor(() => {
      const locationList = screen.queryByTestId('location-list');
      expect(locationList).toBeInTheDocument();
    });
  });
});
