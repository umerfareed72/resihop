import * as Types from '../types/userdetail.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  userDetail: null,
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.User_Detail_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        userDetail: payload,
      };

    case Types.User_Detail_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        userDetail: payload,
      };
    default:
      return state;
  }
};
