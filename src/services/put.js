import {authHeader, header} from '../utilities/constants';
import {putData} from './apiServices';

export default async (url, params, token = authHeader) => {
  return await putData.put(url, params, {headers: token});
};
