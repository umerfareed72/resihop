import moment from 'moment';
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
  returnFirstTime: 'XX:XX',
  returnSecondTime: 'XX:XX',
  mapSegment: null,
  ride_history: [],
  selected_ride_history: null,
  walkingDistance: null,
  deltas: null,
  returnDateTimeStamp: null,
  settings: null,
  drive_history: null,
  selected_drive_history: [],
  cost_per_seat: 0,
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
        myDrivesData: payload?.filter(item => {
          return item.status != 'NO_MATCH' && item.status != 'CANCELLED';
        }),
      };
    case Types.idToUpdateDrive:
      return {
        ...state,
        idToUpdateDrive: payload,
      };
    case Types.myRides:
      return {
        ...state,
        myRidesData: payload.filter(item => {
          return item?.status != 'NO_MATCH' && item?.status != 'CANCELLED';
        }),
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
    case Types.Cost_Per_Seat:
      return {
        ...state,
        cost_per_seat: payload,
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
      const firstTime = moment(payload).format('HH:mm');
      const secondTime = moment(payload).add(30, 'minutes').format('HH:mm');
      return {
        ...state,
        returnFirstTime: firstTime,
        returnSecondTime: secondTime,
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
    case Types.Get_Drives_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        drive_history: payload,
      };

    case Types.Get_Drives_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        drive_history: payload,
      };

    case Types.Select_Drive_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        selected_drive_history: payload,
      };

    case Types.Select_Drive_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        selected_drive_history: payload,
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
    case Types.walkingDistance:
      return {
        ...state,
        walkingDistance: payload,
      };
    case Types.deltas:
      return {
        ...state,
        deltas: payload,
      };
    case Types.returnDateTimeStamp:
      return {
        ...state,
        returnDateTimeStamp: payload,
      };
    case Types.settings:
      return {
        ...state,
        settings: payload,
      };
    default:
      return state;
  }
};
