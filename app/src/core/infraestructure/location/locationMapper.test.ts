import { locationFromResponse } from './locationMapper';
import { Location } from './../../domain/location';

const mockedResponseLocations = '?(["Bergen, NI, Germany","Berlin, BE, Germany"]);';
const mockedResponseLocationsEmpty = '?([]);';
const mockedLocations: Location[] = [{ city: 'Bergen, NI, Germany' }, { city: 'Berlin, BE, Germany' }];

describe('test suit for Location Mapper', () => {
  test('should map a location response from api to Location objects', () => {
    const locationMapped = locationFromResponse(mockedResponseLocations);

    expect(locationMapped.length).toBe(2);
    expect(locationMapped[0].city).toEqual(mockedLocations[0].city);
    expect(locationMapped[1].city).toEqual(mockedLocations[1].city);
  });
  test('should not map an empty location response from api', () => {
    const locationMapped = locationFromResponse(mockedResponseLocationsEmpty);

    expect(locationMapped.length).toBe(0);
  });
});
