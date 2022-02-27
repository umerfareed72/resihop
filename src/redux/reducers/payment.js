import * as Types from '../types/payment.types';
const initialState = {
  loading: false,
  success: false,
  failure: false,
  payment_data: null,
  card_list: [],
  current_card: {},
  checkout: null,
  move: false,
  account_status: null,
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
    case Types.Get_Card_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        card_list: payload,
      };

    case Types.Get_Card_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        card_list: null,
      };
    case Types.Edit_Card_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        // card_list: payload,
      };

    case Types.Edit_Card_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        // card_list: null,
      };

    case Types.Delete_Card_Success:
      const filter = state.card_list?.filter(item => {
        return item?.id != payload?.id;
      });
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        card_list: [...filter],
      };

    case Types.Delete_Card_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        card_list: state.card_list,
      };
    case Types.Current_Card_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        current_card: payload,
      };
    case Types.Checkout_Card_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        checkout: null,
      };
    case Types.Checkout_Card_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        checkout: payload,
      };
    case Types.Get_Account_Success:
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
        account_status: payload,
      };
    case Types.Get_Account_Failure:
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
        account_status: null,
      };

    case Types.Move_From_Drawer:
      return {
        ...state,
        move: payload,
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
