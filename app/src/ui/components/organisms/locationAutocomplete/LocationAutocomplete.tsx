import React, { useCallback, useState } from 'react';
import { LocationApplication } from '../../../../core/application/location';
import { Location } from '../../../../core/domain/location/Location';
import { Input } from '../../atoms';
import './LocationAutocomplete.scss';

type LocationAutocompleteProps = {
  readonly onSelectedLocation?: (location: Location | undefined) => void;
};

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  onSelectedLocation,
}: LocationAutocompleteProps) => {
  const [locationText, setLocationText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();
  const [locations, setLocations] = useState<Location[]>([]);
  const showSuggestedLocations = locations && locations.length > 0;

  const getLocationsByKeyword = useCallback(async (keyword: string) => {
    if (keyword.length > 2) {
      try {
        return await LocationApplication.getLocationsByKeyword(keyword);
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }, []);

  const unselectLocation = () => {
    if (selectedLocation) {
      setSelectedLocation(undefined);
      onSelectedLocation && onSelectedLocation(undefined);
    }
  };

  const handleOnClick = (location: Location) => {
    setLocations([]);
    setSelectedLocation(location);
    setLocationText(location.city);
    onSelectedLocation && onSelectedLocation(location);
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const locationInput = event.currentTarget.value;
    if (locationInput === locationText) return;

    const suggestedLocations = await getLocationsByKeyword(locationInput);

    setLocations(suggestedLocations);
    setLocationText(locationInput);
    unselectLocation();
  };

  return (
    <div className="la-container">
      <div className="la-header">
        <Input
          placeHolder="Location"
          value={locationText}
          onChange={(event) => handleOnChange(event)}
          dataTestId="location-input"
        ></Input>
      </div>
      {showSuggestedLocations && (
        <ul className="la-list" data-testid="location-list">
          {locations.map((location, idx) => (
            <li key={idx} onClick={() => handleOnClick(location)}>
              {location.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { LocationAutocomplete };
