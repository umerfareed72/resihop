import * as Types from '../types/rides.types';
import {get} from '../../services';
import {responseValidator} from '../../utilities/helpers';
import {RIDES_CONST} from '../../utilities/routes';
import {header} from '../../utilities';

///////////////////////////////////////// Get Rides History ////////////////////////////

export const get_rides_history = callBack => async dispatch => {
  try {
    dispatch({type: Types.Rides_Loader, payload: true});
    const response = await get(`${RIDES_CONST}`, await header());
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
