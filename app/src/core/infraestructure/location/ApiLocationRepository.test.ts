import { ApiLocationRepository } from './ApiLocationRepository';
import { locationFromResponse } from './locationMapper';

const mockedResponseLocations = '?(["Bergen, NI, Germany","Berlin, BE, Germany"]);';

const locationResponseOk: Response = {
  ok: true,
  status: 200,
  text: () => Promise.resolve(mockedResponseLocations),
} as Response;
const locationsResponseError: Response = {
  ok: false,
} as Response;

afterEach(() => {
  jest.clearAllMocks();
});

describe('test suite for ApiLocationRepository', () => {
  describe('getLocationsByKeyword', () => {
    it('should return a list of locations for a 200 response', async () => {
      global.fetch = jest.fn().mockImplementation(() => locationResponseOk);
      const mockedKeyword = 'Ber';
      const mockedLocations = locationFromResponse(mockedResponseLocations);

      const returnedLocationList = await ApiLocationRepository.getLocationsByKeyword(mockedKeyword);

      expect(returnedLocationList).toStrictEqual(mockedLocations);
    });
    it('should throws error for an unsuccessfull response', async () => {
      global.fetch = jest.fn().mockImplementation(() => locationsResponseError);
      const mockedError = new Error('Error getting locations from api');

      await expect(() => ApiLocationRepository.getLocationsByKeyword('')).rejects.toThrow(mockedError);
    });
  });
});
