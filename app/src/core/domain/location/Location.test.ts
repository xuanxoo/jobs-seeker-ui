import { Location } from './Location';

const mockedCity = 'Bergen, NI, Germany';

describe('test suite for Location', () => {
  it('should create a new location object', () => {
    const newLocation = Location.create(mockedCity);

    expect(newLocation.city).toEqual(mockedCity);
  });
  it('should throw an error when city is empty', () => {
    const mockedError = new Error('Location city cannot be empty');

    expect(() => Location.create('')).toThrow(mockedError);
  });
});
