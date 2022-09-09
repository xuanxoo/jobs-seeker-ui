import { Location, LocationRepository } from '../../domain/location';

const GetLocationsByKeyword =
  (locationRespository: LocationRepository) =>
  (keyword: string): Promise<Location[]> => {
    if (keyword.length < 3) {
      throw new Error('Keyword must have at least 3 characters');
    }

    return locationRespository.getLocationsByKeyword(keyword);
  };

export { GetLocationsByKeyword };
