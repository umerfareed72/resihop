import * as Types from '../types/auth.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  userdata: null,
  reset_data: {},
  pwd_data: {},
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.Login_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        userdata: payload,
      };

    case Types.Login_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        userdata: payload,
      };
    case Types.Signup_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        userdata: payload,
      };

    case Types.Signup_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        userdata: payload,
      };
    case Types.Logout_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        userdata: payload,
      };
    case Types.Logout_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        userdata: null,
      };
    case Types.Forgot_Password_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        reset_data: payload,
      };
    case Types.Forgot_Password_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        reset_data: payload,
      };

    case Types.Reset_Password_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        pwd_data: payload,
      };
    case Types.Reset_Password_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        pwd_data: payload,
      };

    case Types.Set_loader:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
