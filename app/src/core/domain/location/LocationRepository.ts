import { Location } from './Location';

export interface LocationRepository {
  getLocationsByKeyword(keyword: string): Promise<Location[]>;
}
