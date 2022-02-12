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
  myDrivesData: null,
  myRidesData: null,
  idToUpdateDrive: null,
  dateTimeStamp: null,
  bookRide: null,
  time: null,
  nearestDriver: null,
  returnOrigin: null,
  returnDestination: null,
  returnFirstTime: null,
  mapSegment: null,
  ride_history: [],
  selected_ride_history: null,
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
    case Types.myDrives:
      return {
        ...state,
        myDrivesData: payload,
      };
    case Types.idToUpdateDrive:
      return {
        ...state,
        idToUpdateDrive: payload,
      };
    case Types.myRides:
      return {
        ...state,
        myRidesData: payload,
      };
    case Types.dateTimeStamp:
      return {
        ...state,
        dateTimeStamp: payload,
      };
    case Types.bookRide:
      return {
        ...state,
        bookRide: payload,
      };
    case Types.time:
      return {
        ...state,
        time: payload,
      };
    case Types.nearest:
      return {
        ...state,
        nearestDriver: payload,
      };
    case Types.returnOrigin:
      return {
        ...state,
        returnOrigin: payload,
      };
    case Types.returnDestination:
      return {
        ...state,
        returnDestination: payload,
      };
    case Types.returnFirstTime:
      return {
        ...state,
        returnFirstTime: payload,
      };
    case Types.mapSegment:
      return {
        ...state,
        mapSegment: payload,
      };
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
    case Types.Select_Ride_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        selected_ride_history: payload,
      };

    case Types.Select_Ride_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        selected_ride_history: null,
      };

    default:
      return state;
  }
};
