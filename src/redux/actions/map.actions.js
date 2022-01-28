import axios from 'axios';
import * as Types from '../types/map.types';
import {GetToken, baseURL} from '../../utilities';

export const setOrigin = data => async dispatch => {
  dispatch({
    type: Types.origin,
    payload: data,
  });
};
export const setMapDestination = data => async dispatch => {
  dispatch({
    type: Types.destination,
    payload: data,
  });
};
export const setAvailableSeats = data => async dispatch => {
  dispatch({
    type: Types.availableSeats,
    payload: data,
  });
};
export const setDistanceAndTime = data => async dispatch => {
  dispatch({
    type: Types.distanceAndTime,
    payload: data,
  });
};
export const setIDToUpdateDrive = data => async dispatch => {
  dispatch({
    type: Types.idToUpdateDrive,
    payload: data,
  });
};
export const setDateTimeStamp = data => async dispatch => {
  dispatch({
    type: Types.dateTimeStamp,
    payload: data,
  });
};
export const setBookRide = data => async dispatch => {
  dispatch({
    type: Types.bookRide,
    payload: data,
  });
};
export const setTime = data => async dispatch => {
  dispatch({
    type: Types.time,
    payload: data,
  });
};

export const CreateDriveRequest = data => async dispatch => {
  let Token = await GetToken();

  try {
    const response = await fetch(`${baseURL}drives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    console.log('Create Drive Request', responseJson);
    dispatch({
      type: Types.createDriveRequest,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
  }
};
export const CreateRideRequest =
  (body, setIsLoading, callback) => async dispatch => {
    let Token = await GetToken();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}rides`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      setIsLoading(false);
      callback(responseJson);
      dispatch({
        type: Types.createRideRequest,
        payload: responseJson,
      });
    } catch (error) {
      setIsLoading(false);
      console.log('Create Ride', error);
    }
  };
export const SearchRides = data => async dispatch => {
  let Token = await GetToken();

  if (data === null) {
    dispatch({
      type: Types.searchRides,
      payload: null,
    });
    return;
  }

  try {
    const response = await fetch(
      `${baseURL}rides/search?startLocation.minLat_gte=3`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const responseJson = await response.json();
    console.log('Search Rides', responseJson);
    dispatch({
      type: Types.searchRides,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
  }
};
export const SearchDrives = data => async dispatch => {
  let Token = await GetToken();

  if (data === null) {
    dispatch({
      type: Types.searchDrives,
      payload: null,
    });
    return;
  }
  try {
    const response = await fetch(`${baseURL}drives/search?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    console.log('Search Drives', responseJson);
    dispatch({
      type: Types.searchDrives,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
  }
};

export const MyDrives = data => async dispatch => {
  let Token = await GetToken();
  try {
    const response = await fetch(`${baseURL}drives`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    });

    const responseJson = await response.json();
    console.log('My Drives', responseJson);
    dispatch({
      type: Types.myDrives,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.myDrives,
      payload: null,
    });
  }
};
export const MyRides = data => async dispatch => {
  let Token = await GetToken();
  try {
    const response = await fetch(`${baseURL}rides`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    });

    const responseJson = await response.json();
    dispatch({
      type: Types.myRides,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setUpdateDrive = data => async dispatch => {
  let Token = await GetToken();

  const id = data.id;
  delete data['id'];
  try {
    axios
      .put(`${baseURL}drives/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      })
      .then(response => console.log(response));
  } catch (error) {
    console.log(error);
  }
};
