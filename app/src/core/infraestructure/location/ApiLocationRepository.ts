import { Location, LocationRepository } from '../../domain/location';
import FetchHttpClient from '../../shared/FetchHttpClient';
import { locationFromResponse } from './locationMapper';

const getLocationsByKeyword = async (keyword: string): Promise<Location[]> => {
  try {
    const response = await FetchHttpClient.get(`/autocomplete/city/${keyword}`);

    if (!response.ok) {
      throw new Error('Error getting locations from api');
    }

    const result = await response.text();
    return locationFromResponse(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ApiLocationRepository: LocationRepository = {
  getLocationsByKeyword,
};
