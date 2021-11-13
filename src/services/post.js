import {authHeader, header} from '../utilities/constants';
import {postData} from './apiServices';

export default async (url, params, token = authHeader) => {
  return await postData.post(url, params, {headers: token});
};
