import * as Types from '../types/location.types';
const initialState = {
  location: null,
};

export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.addLocation:
      return {
        ...state,
        location: payload,
      };
    default:
      return state;
  }
};
