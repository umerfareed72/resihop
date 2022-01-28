import * as Types from '../types/auth.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  userdata: null,
  reset_data: {},
  pwd_data: {},
  userInfo: {},
  language: '',
  switching: false,
  is_vehicle: false,
  profile_info: {},
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
        loading: false,
        success: false,
        failure: false,
        userdata: null,
        reset_data: null,
        pwd_data: null,
        userInfo: null,
        language: '',
        switching: false,
        is_vehicle: false,
        profile_info: null,
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
    case Types.Info_Success:
      return {
        ...state,
        userInfo: payload,
      };
    case Types.Info_Failure:
      return {
        ...state,
        userInfo: null,
      };
    case Types.Get_Profile_Success:
      return {
        ...state,
        profile_info: payload,
      };
    case Types.Get_Profile_Failure:
      return {
        ...state,
        profile_info: null,
      };
    case Types.Language_Success:
      return {
        ...state,
        language: payload,
      };
    case Types.Switch_Driver:
      return {
        ...state,
        switching: payload,
      };
    case Types.Is_Vehicle:
      return {
        ...state,
        is_vehicle: payload,
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
