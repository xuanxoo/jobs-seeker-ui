import { Location } from '../../domain/location';

const extractLocations = (response: string) => {
  const rx = /\?\((.*)\)/;
  const arr = rx.exec(response);
  return arr ? arr[1] : '';
};

export const locationFromResponse = (response: string): Location[] => {
  const resultJson = JSON.parse(extractLocations(response));
  return resultJson.filter((city: string) => city !== '').map((city: string) => Location.create(city));
};
