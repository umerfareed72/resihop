import * as Types from '../types/app.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  agora_info: null,
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.Create_Agora_Channel_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        agora_info: payload,
      };

    case Types.Create_Agora_Channel_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        agora_info: null,
      };
    case Types.app_Loader:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
