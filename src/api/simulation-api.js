import _axios from 'axios';
import { config } from '../config';
import * as R from 'ramda';

function getAxios() {
  return _axios.create({
    baseURL: config.SIMULATION_API || '',
    withCredentials: false
  });
}
export async function getSimulationResult(location: any
) {
  const locationParsed = R.concat(location[0], location[1]);
  return  getAxios().get(`/api/simulation?location=${locationParsed}`);
}