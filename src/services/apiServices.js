import axios from 'axios';
import {baseURL} from '../utilities/routes';
export const getData = axios.create({
  baseURL: baseURL,
  method: 'GET',
  withCredentials: true,
});

export const postData = axios.create({
  baseURL: baseURL,
  method: 'POST',
  withCredentials: true,
});

export const putData = axios.create({
  baseURL: baseURL,
  method: 'PUT',
  withCredentials: true,
});
