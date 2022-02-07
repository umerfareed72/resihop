import * as Types from '../types/rides.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  ride_history: [],
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.Get_Rides_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        ride_history: payload,
      };

    case Types.Get_Rides_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        ride_history: payload,
      };
    case Types.Rides_Loader:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};