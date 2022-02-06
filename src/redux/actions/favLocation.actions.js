import * as Types from '../types/location.types';
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

export const AddLocation = (body, callback) => async dispatch => {
  let Token = await GetToken();

  try {
    const response = await fetch(`${baseURL}locations`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(body),
    });

    const responseJson = await response.json();
    dispatch({
      type: Types.addLocation,
      payload: responseJson,
    });
    callback(responseJson);
  } catch (error) {
    console.log(error);
  }
};

export const AddFavLocation = (body, callback) => async dispatch => {
  let Token = await GetToken();

  try {
    const response = await fetch(`${baseURL}favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(body),
    });

    const responseJson = await response.json();
    callback(responseJson);
  } catch (error) {
    console.log(error);
  }
};
