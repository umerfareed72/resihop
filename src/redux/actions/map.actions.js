import axios from 'axios';
import * as Types from '../types/map.types';
import {GetToken, baseURL} from '../../utilities';
import {get, put} from '../../services';
import {responseValidator} from '../../utilities/helpers';
import {RIDES_CONST, DRIVE_CONST} from '../../utilities/routes';
import {header} from '../../utilities';

export const setRoutes = data => async dispatch => {
  dispatch({
    type: Types.selectRoutes,
    payload: data,
  });
};

export const setReturnRide = data => async dispatch => {
  dispatch({
    type: Types.returnRide,
    payload: data,
  });
};

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
export const setReturnOrigin = data => async dispatch => {
  dispatch({
    type: Types.returnOrigin,
    payload: data,
  });
};
export const setReturnMapDestination = data => async dispatch => {
  dispatch({
    type: Types.returnDestination,
    payload: data,
  });
};
export const setAvailableSeats = data => async dispatch => {
  dispatch({
    type: Types.availableSeats,
    payload: data,
  });
};
export const setCostPerSeat = data => async dispatch => {
  dispatch({
    type: Types.Cost_Per_Seat,
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
export const setReturnFirstTime = data => async dispatch => {
  dispatch({
    type: Types.returnFirstTime,
    payload: data,
  });
};
export const SetDriversResponse = data => async dispatch => {
  dispatch({
    type: Types.searchDrives,
    payload: data,
  });
};

export const SetRidesResponse = data => async dispatch => {
  dispatch({
    type: Types.searchRides,
    payload: data,
  });
};
export const SetNearestDriver = data => async dispatch => {
  dispatch({
    type: Types.nearest,
    payload: data,
  });
};

export const setMapSegment = data => async dispatch => {
  dispatch({
    type: Types.mapSegment,
    payload: data,
  });
};

export const setWalkingDistance = data => async dispatch => {
  dispatch({
    type: Types.walkingDistance,
    payload: data,
  });
};

export const setDeltas = data => async dispatch => {
  dispatch({
    type: Types.deltas,
    payload: data,
  });
};

export const setReturnDateTimeStamp = data => async dispatch => {
  dispatch({
    type: Types.returnDateTimeStamp,
    payload: data,
  });
};

export const CreateDriveRequest =
  (body, setIsLoading, callback) => async dispatch => {
    let Token = await GetToken();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}drives`, {
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
        type: Types.createDriveRequest,
        payload: responseJson,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

export const CreateRideRequest =
  (body, setIsLoading, returnTrip, callback) => async dispatch => {
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
      responseJson['return_trip'] = returnTrip;
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

export const setUpdateDrive = (id, data, callBack) => async dispatch => {
  let Token = await GetToken();

  try {
    axios
      .put(`${baseURL}drives/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      })
      .then(response => {
        callBack(response?.data);
      })
      .catch(error => {
        console.log(error?.response?.data);
      });
  } catch (error) {}
};

export const setUpdateRide =
  (body, id, setIsLoading, callback) => async dispatch => {
    let Token = await GetToken();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}rides/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      setIsLoading(false);
      callback(responseJson);
    } catch (error) {
      setIsLoading(false);
      console.log('Update Ride', error);
    }
  };

export const CancelRide =
  (id, route, setIsLoading, callback) => async dispatch => {
    let Token = await GetToken();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}${route}/cancel/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });

      const responseJson = await response.json();
      setIsLoading(false);
      callback(responseJson);
    } catch (error) {
      setIsLoading(false);
      console.log('Update Ride', error);
    }
  };

//My Ride Sort Order
export const MyRidesSortOrder = (route, data, callBack) => async dispatch => {
  let Token = await GetToken();
  try {
    const response = await fetch(`${baseURL}${route}?_sort=${data}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    });

    const responseJson = await response.json();
    callBack(responseJson);
  } catch (error) {
    console.log(error);
  }
};
export const MyRidesHistorySortOrder =
  (route, data, callBack) => async dispatch => {
    let Token = await GetToken();
    try {
      const response = await fetch(
        `${baseURL}${route}?_sort=${data}?status_in=COMPLETED&status_in=CLOSE_WITH_REFUND&status_in=CLOSE_WITH_PARTIALLY_REFUND&status_in=CLOSE_WITH_SUCCESS&status_in=NO_MATCH&status_in=CANCELLED`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );

      const responseJson = await response.json();
      callBack(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

///////////////////////////////////////// Get Rides History ////////////////////////////

export const get_rides_history = callBack => async dispatch => {
  try {
    dispatch({type: Types.Rides_Loader, payload: true});
    const response = await get(
      `${RIDES_CONST}?status_in=COMPLETED&status_in=CLOSE_WITH_REFUND&status_in=CLOSE_WITH_PARTIALLY_REFUND&status_in=CLOSE_WITH_SUCCESS&status_in=CANCELLED&status_in=NO_MATCH`,
      await header(),
    );
    // if (response?.data?.user?.details) {
    dispatch({
      type: Types.Get_Rides_Success,
      payload: response.data,
    });
    callBack(response.data);
  } catch (error) {
    console.log('Unable to add card', error);
    let status = error?.response?.data?.statusCode;
    responseValidator(
      status,
      error?.response?.data?.message[0]?.messages[0]?.message,
    );
    dispatch({
      type: Types.Get_Rides_Failure,
      payload: null,
    });
  }
};
///////////////////////////////////////// Get Drives History ////////////////////////////

export const get_drives_history = callBack => async dispatch => {
  try {
    dispatch({type: Types.Rides_Loader, payload: true});
    const response = await get(
      `${DRIVE_CONST}?status_in=COMPLETED&status_in=CLOSE_WITH_REFUND&status_in=CLOSE_WITH_PARTIALLY_REFUND&status_in=CLOSE_WITH_SUCCESS&status_in=NO_MATCH&status_in=CANCELLED`,
      await header(),
    );
    // if (response?.data?.user?.details) {
    dispatch({
      type: Types.Get_Drives_Success,
      payload: response.data,
    });
    callBack(response.data);
  } catch (error) {
    console.log('Unable to load drives', error);
    let status = error?.response?.data?.statusCode;
    responseValidator(
      status,
      error?.response?.data?.message[0]?.messages[0]?.message,
    );
    dispatch({
      type: Types.Get_Drives_Failure,
      payload: null,
    });
  }
};

//Select Drive History
export const select_drive_history = (data, callBack) => async dispatch => {
  try {
    dispatch({
      type: Types.Select_Drive_Success,
      payload: data,
    });
    callBack();
  } catch (error) {
    dispatch({
      type: Types.Select_Ride_Failure,
      payload: null,
    });
  }
};

///////////////////////////////////////// Select Rides History ////////////////////////////

export const select_ride_history = (data, callBack) => async dispatch => {
  try {
    dispatch({
      type: Types.Select_Ride_Success,
      payload: data,
    });
    callBack();
  } catch (error) {
    dispatch({
      type: Types.Select_Ride_Failure,
      payload: null,
    });
  }
};

export const BookRide =
  (body, id, setBookLoading, callback) => async dispatch => {
    setBookLoading(true);
    try {
      const response = await put(`drives/book/${id}`, body, await header());
      setBookLoading(false);
      callback(response.data);
    } catch (error) {
      setBookLoading(false);
      console.log('Book Ride', error.response.data);
    }
  };

export const get_settings = () => async dispatch => {
  try {
    const res = await get(`settings`, await header());
    dispatch({
      type: Types.settings,
      payload: res.data,
    });
  } catch (error) {
    console.log('Settings', error);
  }
};
//Set Recurring Dates Recurring Rides

export const setRecurringDates = data => async dispatch => {
  try {
    console.log(data);
    dispatch({
      type: Types.Set_Recurring_Dates,
      payload: data,
    });
  } catch (error) {
    console.log('Error', error);
  }
};

export const setReturnRecurringDates = data => async dispatch => {
  try {
    dispatch({
      type: Types.Set_Return_Recurring_Dates,
      payload: data,
    });
  } catch (error) {
    console.log('Settings', error);
  }
};
