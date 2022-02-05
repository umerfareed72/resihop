import * as Types from '../types/map.types';
import {GetToken, baseURL} from '../../utilities';

export const GetFavLocations = (setIsLoading, callback) => async dispatch => {
  let Token = await GetToken();
  try {
    const resposne = await fetch(`${baseURL}favorites?type=LOCATION`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    });

    const resposneJson = await resposne.json();

    callback(resposneJson);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
