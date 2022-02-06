import * as Types from '../types/payment.types';
import {get, post, put, remove} from '../../services';
import {responseValidator} from '../../utilities/helpers';
import {PAYMENT_CONST} from '../../utilities/routes';
import {header} from '../../utilities';

/////////////////////////////////////////  Add Card   ////////////////////////////

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

/////////////////////////////////////////  Get Card   ////////////////////////////

export const get_card_list = (cid, callBack) => async dispatch => {
  try {
    // dispatch({type: Types.Payment_Loader, payload: true});
    const response = await get(`${PAYMENT_CONST}/${cid}`, await header());
    // if (response?.data?.user?.details) {
    dispatch({
      type: Types.Get_Card_Success,
      payload: response.data?.data,
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
      type: Types.Get_Card_Failure,
      payload: null,
    });
  }
};

/////////////////////////////////////////  Edit Card   ////////////////////////////

export const edit_stripe_card = (cid, data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Payment_Loader, payload: true});
    const response = await put(`${PAYMENT_CONST}/${cid}`, data, await header());
    // if (response?.data?.user?.details) {
    dispatch({
      type: Types.Edit_Card_Success,
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
      type: Types.Edit_Card_Failure,
      payload: null,
    });
  }
};

//Save Catd
export const save_current_card = (data, callBack) => async dispatch => {
  try {
    dispatch({
      type: Types.Current_Card_Success,
      payload: data,
    });
    callBack();
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////  Delete Card   ////////////////////////////

export const delete_stripe_card = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Payment_Loader, payload: true});
    const response = await remove(
      `${PAYMENT_CONST}/${data?.card_id}/${data?.cid}`,
      await header(),
    );
    // if (response?.data?.user?.details) {
    dispatch({
      type: Types.Delete_Card_Success,
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
      type: Types.Delete_Card_Failure,
      payload: null,
    });
  }
};
