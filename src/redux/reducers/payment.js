import * as Types from '../types/payment.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  payment_data: null,
};
export default (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case Types.Add_Card_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        payment_data: payload,
      };

    case Types.Add_Card_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        payment_data: null,
      };
    case Types.Payment_Loader:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
