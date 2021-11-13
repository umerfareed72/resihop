import {authHeader, header} from '../utilities/constants';
import {getData} from './apiServices';
export default async (url, token = authHeader, params) => {
  return getData.get(url, {headers: token}, {params: {...params}});
};
