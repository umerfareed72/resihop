import * as Types from '../types/payment.types';
import {get, post, put} from '../../services';
import {responseValidator} from '../../utilities/helpers';
import {PAYMENT_CONST} from '../../utilities/routes';
import {header} from '../../utilities';

/////////////////////////////////////////  Login   ////////////////////////////

export const add_stripe_card = (body, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Payment_Loader, payload: true});
    const response = await post(`${PAYMENT_CONST}`, body, await header());
    // if (response?.data?.user?.details) {
    dispatch({
      type: Types.Add_Card_Success,
      payload: response.data,
    });
    callBack(response.data);
  } catch (error) {
    console.log('Unable to add card', error);
    let status = error?.response?.data?.statusCode;
    responseValidator(
      status,
      error?.response?.data?.message[0]?.messages[0]?.message,
    );
    dispatch({
      type: Types.Add_Card_Failure,
      payload: null,
    });
  }
};
