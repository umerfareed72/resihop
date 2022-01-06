import axios from 'axios';
import * as Types from '../types/map.types';
import {GetToken} from '../../utilities';

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
export const CreateDriveRequest = data => async dispatch => {
  let Token = await GetToken();

  try {
    const response = await fetch(
      'https://resihop-server.herokuapp.com/drives',
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
    dispatch({
      type: Types.createDriveRequest,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
  }
};
export const CreateRideRequest = data => async dispatch => {
  let Token = await GetToken();

  console.log('Data', data);

  try {
    const response = await fetch('https://resihop-server.herokuapp.com/rides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    console.log('Create Ride', responseJson);
    dispatch({
      type: Types.createRideRequest,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
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
      'https://resihop-server.herokuapp.com/rides/search?startLocation.minLat_gte=3',
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
    const response = await fetch(
      'https://resihop-server.herokuapp.com/drives/search?',
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
    const response = await fetch(
      'https://resihop-server.herokuapp.com/drives',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    );

    const responseJson = await response.json();
    dispatch({
      type: Types.myDrives,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: Types.myDrives,
      payload: responseJson,
    });
  }
};
export const MyRides = data => async dispatch => {
  let Token = await GetToken();

  try {
    const response = await fetch('https://resihop-server.herokuapp.com/rides', {
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
    dispatch({
      type: Types.myRides,
      payload: responseJson,
    });
  }
};

export const setUpdateDrive = data => async dispatch => {
  let Token = await GetToken();

  const id = data.id;
  delete data['id'];
  try {
    axios
      .put(
        `https://resihop-server.herokuapp.com/drives/${id}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      )
      .then(response => console.log(response));
  } catch (error) {
    console.log(error);
  }
};
