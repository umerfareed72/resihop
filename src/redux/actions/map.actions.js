import * as Types from '../types/map.types';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjI0Yjk2Mjg5ZjEyNTIwNGFiY2I0NCIsImlhdCI6MTY0MDAxOTc3NiwiZXhwIjoxNjQyNjExNzc2fQ.8aIsmTNdoYiinpeCrF12YRorK1RSa9QLgmVIE7El4dc';

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
export const CreateDriveRequest = data => async dispatch => {
  try {
    const response = await fetch(
      'https://resihop-server.herokuapp.com/drives',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      },
    );

    const responseJson = await response.json();
    dispatch({
      type: Types.createRideRequest,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
  }
};
export const CreateRideRequest = data => async dispatch => {
  try {
    const response = await fetch('https://resihop-server.herokuapp.com/rides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    dispatch({
      type: Types.createRideRequest,
      payload: responseJson,
    });
  } catch (error) {
    console.log(error);
  }
};
export const SearchRides = data => async dispatch => {
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
          Authorization: `Bearer ${TOKEN}`,
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
          Authorization: `Bearer ${TOKEN}`,
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
