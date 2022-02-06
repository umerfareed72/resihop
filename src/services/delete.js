import {authHeader, header} from '../utilities/constants';
import {deleteData} from './apiServices';

export default async (url, token = authHeader) => {
  return await deleteData.delete(url, {headers: token});
};
