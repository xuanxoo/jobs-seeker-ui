import { ApiLocationRepository } from '../../infraestructure/location/ApiLocationRepository';
import { GetLocationsByKeyword } from './GetLocationsByKeyword';

const LocationApplication = {
  getLocationsByKeyword: GetLocationsByKeyword(ApiLocationRepository),
};

export { LocationApplication };
