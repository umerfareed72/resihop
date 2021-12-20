import * as Types from '../types/map.types';
const initialState = {
  origin: null,
  destination: null,
  availableSeats: 0,
  distanceAndTime: null,
  createDriveRequestResponse: null,
  createRideRequestResponse: null,
  searchRideResponse: null,
  searchDriveResponse: null,
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.origin:
      return {
        ...state,
        origin: payload,
      };
    case Types.destination:
      return {
        ...state,
        destination: payload,
      };
    case Types.availableSeats:
      return {
        ...state,
        availableSeats: payload,
      };
    case Types.distanceAndTime:
      return {
        ...state,
        distanceAndTime: payload,
      };
    case Types.createDriveRequest:
      return {
        ...state,
        createDriveRequestResponse: payload,
      };
    case Types.createRideRequest:
      return {
        ...state,
        createRideRequestResponse: payload,
      };
    case Types.searchDrives:
      return {
        ...state,
        searchDriveResponse: payload,
      };
    case Types.searchRides:
      return {
        ...state,
        searchRideResponse: payload,
      };
    default:
      return state;
  }
};
