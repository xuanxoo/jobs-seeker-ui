import { LocationApplication } from '.';
import { Location, LocationRepository } from '../../domain/location';
import { GetLocationsByKeyword } from './GetLocationsByKeyword';

const mockedLocations: Location[] = [
  { city: 'Bergen, NI, Germany' },
  { city: 'Berlin, BE, Germany' },
  { city: 'Munich, BY, Germany' },
];

const mockedLocationRepository: LocationRepository = {
  getLocationsByKeyword: async (keyword: string) => mockedLocations,
};

describe('test suite for GetLocationByKeyword usecase', () => {
  it('should return two suggested locations for a valid keyword', async () => {
    const mockedKeyword = 'Ber';

    const locationPromise = await GetLocationsByKeyword(mockedLocationRepository);
    const suggestedLocations = await locationPromise(mockedKeyword);

    expect(suggestedLocations).toBe(mockedLocations);
  });
  it('should thrown an error when keyword is minor than 3', async () => {
    const mockedKeyword = 'Be';
    const mockedError = new Error('Keyword must have at least 3 characters');

    const locationPromise = await GetLocationsByKeyword(mockedLocationRepository);

    await expect(() => locationPromise(mockedKeyword)).toThrow(mockedError);
  });
});
